const path = require('path')
const NeDB = require('nedb')

const lib = require('./library')

const connectDB = new NeDB({
  filename: path.join(__dirname, 'database/connect.db'),
  autoload: true
})

function newConnect (user, oldPass, callback) {
  const expire = (new Date()).setHours((new Date()).getHours() + 24)
  const connectPass = lib.getRandomString(12)
  const docs = {
    expire,
    connectPass,
    userKey: user.userKey
  }
  console.log(lib.time() + '[connect] newConnect: ' + connectPass)
  connectDB.find({userKey: user.userKey}, (findError, pass) => {
    if (findError) return callback({type: 'DBError', fatal: true}, null)
    if (pass.length === 0) {
      console.log('insert')
      connectDB.insert(docs, (err, newdoc) => {
        if (err) return callback({type: 'DBError', fatal: true}, null)
        callback(null, docs)
      })
    } else {
      console.log('update')
      connectDB.update({userKey: user.userKey}, docs, {}, (err, newdoc) => {
        if (err) return callback({type: 'DBError', fatal: true}, null)
        callback(null, docs)
      })
    }
  })

}

module.exports = {
  newConnect
}