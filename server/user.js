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
  if (await checkPastSignups(userdata.userid)) return callback({type: 'alreadySignedError'}, null)
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

module.exports = {
  addUser
}