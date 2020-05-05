const path = require('path')
const NeDB = require('nedb')

const lib = require('./library')

const uuidv1 = require('uuid/v1')

const userDB = new NeDB({
  filename: path.join(__dirname, 'database/user.db'),
  autoload: true,
  timestampData: true,
})

async function addUser (userdata, callback) {
  if (await checkPastSignups(userdata.userid)) return callback({type: 'alreadySignuped', fatal: false}, null)
  const clientToken = lib.createToken(userdata.clientid)
  const user = {
    userid: userdata.userid,
    passwordHash: lib.getHash(userdata.password),
    userKey: lib.getHash(uuidv1().split('-').join('')),
    username: userdata.userid,
    othername: 'あいて',
    clientList: [{
      agent: userdata.userAgent,
      id: userdata.clientid,
      token: clientToken,
      lastLogin: (new Date()).getTime()
    }]
  }
  userDB.insert(user, (err, newdoc) => {
    if (err || !newdoc) return callback({type: 'DBError', fatal: true}, null)
    callback(null, user)
  })
}

function login (userdata, callback) {
  const hash = lib.getHash(userdata.password)
  const token = lib.createToken(userdata.clientid)
  const lastLogin = (new Date()).getTime()
  getUser(userdata.userid, (getUserError, user) => {
    if (getUserError) return callback(getUserError, null)
    if (user.passwordHash !== hash) return callback({type: 'passwordWrong', fatal: false}, null)
    lib.getToken(userdata.clientid, user) ? console.log('Known device') : console.log('New device')
    const newClientList = lib.getToken(userdata.clientid, user) ?
    user.clientList.map(client => {
      return client.id === userdata.clientid ? {
        ...client,
        token,
        lastLogin
      } : client
    }) :
    user.clientList.concat({
      agent: userdata.userAgent,
      id: userdata.clientid,
      token,
      lastLogin
    })
    const newUser = {
      ...user,
      clientList: newClientList
    }
    updateUser(newUser, (UpdateUserError) => {
      if (UpdateUserError) return callback(UpdateUserError, null)
      callback(null, newUser)
    })
  })
}

function deleteSession (session, callback) {
  getUser(session.userid, (getUserError, user) => {
    if (getUserError) return callback(getUserError, null)
    const newClientList = user.clientList.filter((e) => {return e.id !== session.clientid})
    const newUser = {
      ...user,
      clientList: newClientList
    }
    updateUser(newUser, (updateUserError) => {
      if (updateUserError) return callback(updateUserError, null)
      callback(null, newUser)
    })
  })
}

function checkPastSignups (userid) {
  return new Promise((resolve) => {
    userDB.findOne({userid}, (err, result) => {
      if (err) return resolve({type: 'DBError', fatal: true})
      if (result) return resolve({type: 'alreadySignuped', fatal: false})
      return resolve(false)
    })
  })
}

function getUser (userid, callback) {
  userDB.findOne({ userid }, (err, user) => {
    if (err) return callback({type: 'DBError', fatal: true}, null)
    if (user === null) return callback({type: 'userNotFound', fatal: false}, null)
    callback(null, user)
  })
}

function updateUser (user, callback) {
  userDB.update({userid: user.userid}, user, {}, (err, num) => {
    if (err) return callback({type: 'updateUserNotFound', fatal: true})
    if (num === 0) return callback({type: 'updateUserError', fatal: true})
    callback(null)
  })
}

function authentication (session, callback) {
  getUser(session.userid, (err, user) => {
    if (err) return callback(err, null)
    if (lib.getToken(session.clientid, user) !== session.clientToken) return callback({type: 'notMatchToken', fatal: false}, null)
    const clientList = user.clientList.map(client => {
      return client.id === session.clientid ? {
        ...client,
        lastLogin: (new Date()).getTime()
      } : client
    })
    const newUser = {
      ...user,
      clientList
    }
    updateUser(newUser, (updateUserError) => {
      if (updateUserError) return callback(updateUserError, null)
      return callback(null, newUser)
    })
  })
}

function updateUsername (user, username, callback) {
  const newUser = {
    ...user,
    username
  }
  updateUser(newUser, (updateUserError) => {
    return callback(updateUserError, newUser)
  })
}

function updateOthername (user, othername, callback) {
  const newUser = {
    ...user,
    othername
  }
  updateUser(newUser, (updateUserError) => {
    return callback(updateUserError, newUser)
  })
}

function updatePassword (user, oldPassword, newPassword, callback) {
  const oldHash = lib.getHash(oldPassword)
  const newHash = lib.getHash(newPassword)
  if (user.passwordHash !== oldHash) return callback({type: 'oldPasswordWrong', fatal: false}, null)
  const newUser = {
    ...user,
    passwordHash: newHash
  }
  updateUser(newUser, (updateUserError) => {
    return callback(updateUserError, newUser)
  })
}

// /status から呼び出し
function getUsername (userKey, callback) {
  getUserByUserKey(userKey, (getUserError, user) => {
    callback(getUserError, user.username)
  })
}

function getUserByUserKey (userKey, callback) {
  userDB.findOne({ userKey }, (err, user) => {
    if (err) return callback({type: 'DBError', fatal: true}, null)
    if (user === null) return callback({type: 'userNotFound', fatal: false}, null)
    callback(null, user)
  })
}

function removeUser (user, password, callback) {
  const hash = lib.getHash(password)
  if (!user || user.passwordHash !== hash) return callback({type: 'passwordNotMatch', fatal: false}, null)
  userDB.remove({userid: user.userid}, {}, (err) => {
    if (err) return callback({type: 'DBError', fatal: true}, null)
    callback(null, true)
  })
}

module.exports = {
  addUser, login, deleteSession, authentication, updateUsername, updateOthername, updatePassword, getUsername, removeUser
}