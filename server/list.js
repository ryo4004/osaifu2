const path = require('path')
const NeDB = require('nedb')

const lib = require('./library')

const listDB = new NeDB({
  filename: path.join(__dirname, 'database/list.db'),
  autoload: true
})

function getDBStatus (user, callback) {
  console.log('[listDB] getDBStatus: ' + user.userid)
  listDB.findOne({'host': user.userKey}, (hostError, host) => {
    if (hostError) return callback({type: 'hostDBError', fatal: true}, null)
    if (host !== null) {
      if (!host.status) return callback({type: 'statusError', fatal: false}, null)
      return callback(null, {dbStatus: host.status, dbKey: host.dbKey, user: 'host'})
    }
    listDB.findOne({'client': user.userKey}, (clientError, client) => {
      if (clientError) return callback({type: 'clientDBError', fatal: true}, null)
      if (client === null) return callback({type: 'clientNotFound', fatal: false}, null)
      if (!client.status) return callback({type: 'clientDisabled', fatal: false}, null)
      return callback(null, {dbStatus: client.status, dbKey: client.dbKey, user: 'client'})
    })
  })
}

module.exports = {
  getDBStatus
}