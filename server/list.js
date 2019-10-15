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
  listDB.findOne({createUser: user.userKey, type: 'solo', status: true}, (soloError, solo) => {
    if (soloError) return callback({type: 'soloError', fatal: true}, null)
    if (solo) return callback(null, {...solo})
    listDB.findOne({host: user.userKey, type: 'duo', status: true}, (hostError, host) => {
      listDB.findOne({client: user.userKey, type: 'duo', status: true}, (clientError, client) => {
        if (hostError || clientError) return callback({type: 'duoError', fatal: true}, null)
        if (host) return callback(null, {...host})
        if (client) return callback(null, {...client})
        return callback({type: 'dbClosed', fatal: false}, null)
      })
    })
  })
}

function createDB (user, callback) {
  getDBStatus(user, (getDBStatusError, dbStatus) => {
    if (getDBStatusError && getDBStatusError.fatal) return callback(getDBStatusError, null)
    if (dbStatus) return callback({type:'alreadyCreated', fatal: false}, null)
    const newDB = {
      status: true,
      type: 'solo',
      createUser: user.userKey,
      dbKey: uuidv1().split('-').join(''),
      rate: 50,
      host: false,
      client: false,
      name: user.username
    }
    listDB.insert(newDB, (err, newdoc) => {
      if (err) return callback({type: 'DBError', fatal: true}, null)
      callback(null, newDB)
    })
  })
}

function createDuoDB (user, hostUserKey, callback) {
  // clientが呼び出しをするので先にclientを更新
  getDBStatus(user, (getDBStatusError, dbStatus) => {
    if (getDBStatusError && getDBStatusError.fatal) return callback(getDBStatusError, null)
    if (dbStatus.type !== 'solo') return callback({type:'alreadyCreated', fatal: false}, null)
    // clientのDBを更新
    const newDBStatus = {
      ...dbStatus,
      status: false
    }
    console.log(newDBStatus)
    updateStatus(newDBStatus, (updateStatusError) => {
      if (updateStatusError) return callback(updateStatusError)
      // hostの情報を更新
      getDBStatus({userKey: hostUserKey}, (getHostDBStatusError, hostDBStatus) => {
        if (getHostDBStatusError && getHostDBStatusError.fatal) return callback(getHostDBStatusError, null)
        if (hostDBStatus.type !== 'solo') return callback({type:'alreadyCreated', fatal: false}, null)
        // hostのDBを更新
        const newHostDBStatus = {
          ...hostDBStatus,
          status: false
        }
        console.log(newHostDBStatus)
        updateStatus(newHostDBStatus, (updateHostStatusError) => {
          if (updateHostStatusError) return callback(updateHostStatusError)
          // 新しいDBを作成
          const newDB = {
            status: true,
            type: 'duo',
            createUser: hostUserKey,
            dbKey: uuidv1().split('-').join(''),
            rate: 50,
            host: hostUserKey,
            client: user.userKey,
            name: 'おさいふ'
          }
          listDB.insert(newDB, (err, newdoc) => {
            if (err) return callback({type: 'DBError', fatal: true}, null)
            callback(null, newDB)
          })
        })
      })
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

function updateStatus (status, callback) {
  listDB.update({ _id: status._id }, status, {}, (err, num) => {
    if (err) return callback({type: 'updateStatusNotFound', fatal: true})
    if (num === 0) return callback({type: 'updateStatusError', fatal: true})
    callback(null)
  })
}

function updateOsaifuname (user, osaifuname, callback) {
  getDBStatus(user, (getDBStatusError, dbStatus) => {
    if (getDBStatusError && getDBStatusError.fatal) return callback(getDBStatusError, null)
    if (!dbStatus) return callback({type:'dbNotFound', fatal: false}, null)
    const newDBStatus = {
      ...dbStatus,
      name: osaifuname
    }
    updateStatus(newDBStatus, (updateStatusError) => {
      return callback(updateStatusError, {...newDBStatus})
    })
  })
}

module.exports = {
  getDBStatus, createDB, createDuoDB, addPayment, getList, deletePayment, updateOsaifuname
}