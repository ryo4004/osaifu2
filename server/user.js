const path = require('path')
const NeDB = require('nedb')

const lib = require('./library')

const uuidv1 = require('uuid/v1')
const uuidv4 = require('uuid/v4')

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
    name: userdata.userid,
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
      if (UpdateUserError) return callback(UpdateUserError)
      callback(null, newUser)
    })
  })
}

function checkPastSignups (userid) {
  return new Promise((resolve, reject) => {
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
    if (err) return callback({type: 'updateUserNotFound', fatal: true}, null)
    if (num === 0) return callback({type: 'updateUserError', fatal: true}, null)
    callback(null, user)
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

function updateName (user, name, callback) {
  const newUser = {
    ...user,
    name
  }
  updateUser(newUser, (updateUserError) => {
    return callback(updateUserError, newUser)
  })
}

module.exports = {
  addUser, login, authentication
}