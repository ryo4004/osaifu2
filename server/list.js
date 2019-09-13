const path = require('path')
const NeDB = require('nedb')

const uuidv1 = require('uuid/v1')

const lib = require('./library')

const listDB = new NeDB({
  filename: path.join(__dirname, 'database/list.db'),
  autoload: true
})

function getDBStatus (user, callback) {
  console.log('[listDB] getDBStatus: ' + user.userid)
  listDB.findOne({'host': user.userKey}, (hostError, host) => {
    if (hostError) return callback({type: 'hostDBError', fatal: true}, null)
    listDB.findOne({'client': user.userKey}, (clientError, client) => {
      if (clientError) return callback({type: 'clientDBError', fatal: true}, null)
      if (host === null && client === null) return callback({type: 'notFound', fatal: false}, null)
      if (host) {
        if (!host.status) return callback({type: 'statusError', fatal: false}, null)
        return callback(null, {dbStatus: host.status, dbKey: host.dbKey, user: 'host'})
      } else if (client) {
        if (!client.status) return callback({type: 'clientDisabled', fatal: false}, null)
        return callback(null, {dbStatus: client.status, dbKey: client.dbKey, user: 'client'})
      } else if (host === null) {
        return callback({type: 'hostNotFound', fatal: false}, null)
      } else if (client === null) {
        return callback({type: 'clientNotFound', fatal: false}, null)
      }
    })
  })
}

function createDB (user, name, callback) {
  getDBStatus(user, (getDBStatusError, dbStatus) => {
    if (getDBStatusError && getDBStatusError.fatal) return callback(getDBStatusError, null)
    if (dbStatus) return callback({type:'alreadyCreated', fatal: false}, null)
    const docs = {
      status: true,
      dbKey: uuidv1().split('-').join(''),
      host: user.userKey,
      client: false,
      name
    }
    listDB.insert(docs, (err, newdoc) => {
      if (err) return callback({type: 'DBError', fatal: true}, null)
      callback(null, newdoc)
    })
  })
}

function createOsaifuDB (dbkey) {
  return new NeDB({
    filename: path.join(__dirname, 'osaifu/' + dbkey + '.db'),
    autoload: true,
    timestampData: true
  })
}

function addPayment (user, payment, callback) {
  getDBStatus(user, (getDBStatusError, dbStatus) => {
    if (getDBStatusError && getDBStatusError.fatal) return callback(getDBStatusError, null)
    if (!dbStatus) return callback({type:'dbNotFound', fatal: false}, null)
    const osaifuDB = createOsaifuDB(dbStatus.dbKey)
    osaifuDB.insert(payment, (osaifuDBError, newdoc) => {
      if (osaifuDBError) return callback({type: 'DBError', fatal: true}, null)
      callback(null, newdoc)
    })
  })
}

function getList (user, callback) {
  getDBStatus(user, (getDBStatusError, dbStatus) => {
    if (getDBStatusError && getDBStatusError.fatal) return callback(getDBStatusError, null)
    if (!dbStatus) return callback({type:'dbNotFound', fatal: false}, null)
    const osaifuDB = createOsaifuDB(dbStatus.dbKey)
    osaifuDB.find({}).sort({paymentDate: -1, createdAt: -1}).exec((findError, list) => {
      if (findError) return callback({type: 'DBError', fatal: true}, null)
      return callback(null, list)
    })
  })
}

function deletePayment (user, id, callback) {
  getDBStatus(user, (getDBStatusError, dbStatus) => {
    if (getDBStatusError && getDBStatusError.fatal) return callback(getDBStatusError, null)
    if (!dbStatus) return callback({type:'dbNotFound', fatal: false}, null)
    const osaifuDB = createOsaifuDB(dbStatus.dbKey)
    osaifuDB.remove({_id: id}, {}, (removeError, num) => {
      if (removeError) return callback({type: 'DBError', fatal: true}, null)
      if (num !== 1) return callback({type: 'removeError', fatal: true}, null)
      return callback(null, true)
    })
  })
}

module.exports = {
  getDBStatus, createDB, addPayment, getList, deletePayment
}