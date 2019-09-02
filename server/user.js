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
  if (await checkPastSignups(userdata.userid)) return callback({type: 'alreadySignuped'}, null)
  const clientToken = lib.createToken(userdata.clientid)
  const user = {
    userid: userdata.userid,
    passwordHash: lib.getHash(userdata.password),
    name: userdata.userid,
    clientList: [{
      agent: userdata.userAgent,
      id: userdata.clientid,
      token: clientToken,
      lastLogin: (new Date()).getTime()
    }]
  }
  userDB.insert(user, (err, newdoc) => {
    if (err || !newdoc) return callback({type: 'DBError'}, null)
    callback(null, user)
  })
}

function checkPastSignups (userid) {
  return new Promise((resolve, reject) => {
    userDB.findOne({userid}, (err, result) => {
      if (err) return resolve({type: 'DBError'})
      if (result) return resolve({type: 'alreadySignuped'})
      return resolve(false)
    })
  })
}

function getUser (userid) {
  userDB.findOne({ userid }, (err, user) => {
    if (err || user === null) return callback({type: 'userNotFound'}, null)
    callback(null, user)
  })
}

function updateUser (user, callback) {
  userDB.update({userid: user.userid}, user, {}, (err, num) => {
    if (err) return callback({type: 'updateUserNotFound'}, null)
    if (num === 0) return callback({type: 'updateUserError'}, null)
    callback(null, user)
  })
}

function authentication (session, callback) {
  getUser(session.userid, (err, user) => {
    if (err) return callback(err, null)
    if (libUser.getToken(session.clientid, user) !== session.clientToken) return callback({type: 'notMatchToken'}, null)
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
    updateUser(newUser, (err) => {
      if (err) return callback(err, null)
      return callback(null, newUser)
    })
  })
}

module.exports = {
  addUser, authentication
}