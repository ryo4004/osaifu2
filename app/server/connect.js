const path = require('path')
const NeDB = require('nedb')

const uuidv4 = require('uuid/v4')

const lib = require('./library')

const connectDB = new NeDB({
  filename: path.join(__dirname, 'database/connect.db'),
  autoload: true
})

function newConnect (user, callback) {
  const expire = (new Date()).setHours((new Date()).getHours() + 24)
  const connectPass = uuidv4().split('-')[0]
  const docs = {
    status: true,
    expire,
    connectPass,
    userKey: user.userKey
  }
  console.log(lib.time() + '[connect] newConnect: ' + connectPass)
  connectDB.find({userKey: user.userKey}, (findError, pass) => {
    if (findError) return callback({type: 'DBError', fatal: true}, null)
    if (pass.length === 0) {
      console.log('insert')
      connectDB.insert(docs, (err) => {
        if (err) return callback({type: 'DBError', fatal: true}, null)
        callback(null, docs)
      })
    } else {
      console.log('update')
      connectDB.update({userKey: user.userKey}, docs, {}, (err) => {
        if (err) return callback({type: 'DBError', fatal: true}, null)
        callback(null, docs)
      })
    }
  })
}

function getConnect (user, connectPass, callback) {
  console.log(lib.time() + '[connect] getConnect: ' + connectPass)
  connectDB.findOne({connectPass}, (findError, connect) => {
    if (findError) return callback({type: 'DBError', fatal: true}, null)
    if (!connect) return callback({type: 'keyNotFound', fatal: false}, null)
    if (!connect.status) return callback({type: 'keyAlreadyUsed', fatal: false}, null)
    if (connect.userKey === user.userKey) return callback({type: 'notAvailableBySelf', fatal: false}, null)
    console.log('time: ', connect.expire, (new Date()).getTime())
    if (connect.expire < (new Date()).getTime()) return callback({type: 'keyExpired', fatal: false}, null)
    connectDB.remove({connectPass}, {}, (err) => {
      if (err) return callback({type: 'DBError', fatal: true})
      return callback(null, connect.userKey)
    })
  })
}

function removeKey (connectPass, callback) {
  if (!connectPass) return callback(null)
  console.log(lib.time() + '[connect] disableKey: ' + connectPass)
  connectDB.remove({connectPass}, {}, (err) => {
    if (err) return callback({type: 'DBError', fatal: true})
    return callback(null)
  })
}

module.exports = {
  newConnect, getConnect, removeKey
}