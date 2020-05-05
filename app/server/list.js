const path = require('path')
const NeDB = require('nedb')

const uuidv1 = require('uuid/v1')

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
      name: user.username + ' のおさいふ'
    }
    listDB.insert(newDB, (err) => {
      if (err) return callback({type: 'DBError', fatal: true}, null)
      callback(null, newDB)
    })
  })
}

function getOldDBStatus (user, callback) {
  console.log('[listDB] getOldDBStatus: ' + user.userid)
  listDB.findOne({createUser: user.userKey, type: 'solo', status: false}, (soloError, solo) => {
    if (soloError) return callback({type: 'soloError', fatal: false}, null)
    if (solo) return callback(null, {...solo})
  })
}

function removeDuoDB (user, callback) {
  getDBStatus(user, (getDBStatusError, dbStatus) => {
    if (getDBStatusError && getDBStatusError.fatal) return callback(getDBStatusError, null)
    if (dbStatus.type === 'solo') return callback({type: 'soloDB', fatal: false}, null)
    const selfType = user.userKey === dbStatus.host ? 'host' : 'client'
    const otherType = selfType === 'host' ? 'client' : 'host'
    const rate = {
      host: dbStatus.rate,
      client: (100 - parseInt(dbStatus.rate))
    }
    const newDBStatus = {
      ...dbStatus,
      status: false
    }
    updateStatus(newDBStatus, (updateStatusError) => {
      if (updateStatusError) return callback(updateStatusError, null)
      getOldDBStatus(user, (getSelfOldDBStatusError, oldSelfDBStatus) => {
        if (getSelfOldDBStatusError && getSelfOldDBStatusError.fatal) return callback(getSelfOldDBStatusError, null)
        const newSelfDBStatus = {
          ...oldSelfDBStatus,
          rate: rate[selfType],
          status: true
        }
        updateStatus(newSelfDBStatus, (updateSelfStatusError) => {
          if (updateSelfStatusError) return callback(updateSelfStatusError, null)
          getOldDBStatus({userKey: dbStatus[otherType], userid: 'other [temp] ' + otherType}, (getOtherOldDBStatusError, otherOldDBStatus) => {
            if (getOtherOldDBStatusError && getOtherOldDBStatusError.fatal) return callback(getOtherOldDBStatusError, null)
            const newOtherDBStatus = {
              ...otherOldDBStatus,
              rate: rate[otherType],
              status: true
            }
            updateStatus(newOtherDBStatus, (updateOtherStatusError) => {
              if (updateOtherStatusError) return callback(updateOtherStatusError, null)
              osaifuDivide(newDBStatus.dbKey, newSelfDBStatus.dbKey, newOtherDBStatus.dbKey, selfType, otherType, (divideError) => {
                if (divideError) return callback({type: 'DBError', fatal: true}, null)
                callback(null, newSelfDBStatus)
              })
            })
          })
        })
      })
    })
  })
}

function osaifuDivide (duoKey, selfKey, otherKey, selfType, otherType, callback) {
  const duoOsaifuDB = createOsaifuDB(duoKey)
  const selfOsaifuDB = createOsaifuDB(selfKey)
  const otherOsaifuDB = createOsaifuDB(otherKey)
  duoOsaifuDB.find({}).sort({paymentDate: -1, createdAt: -1}).exec(async (duoFindError, duoList) => {
    if (duoFindError) return callback({type: 'DBError', fatal: true})
    await insertData(duoList, selfOsaifuDB, selfType)
    await insertData(duoList, otherOsaifuDB, otherType)
    duoOsaifuDB.remove({}, {multi: true}, (duoRemoveError) => {
      if (duoRemoveError) return callback({type: 'DBError', fatal: true})
      callback(null)
    })
  })
}

function createDuoDB (user, hostUserKey, callback) {
  // clientがこの関数を呼び出すので先にclientを更新
  getDBStatus(user, (getDBStatusError, dbStatus) => {
    if (getDBStatusError && getDBStatusError.fatal) return callback(getDBStatusError, null)
    if (dbStatus.type !== 'solo') return callback({type:'alreadyCreated', fatal: false}, null)
    // clientのDBを更新
    const newDBStatus = {
      ...dbStatus,
      status: false
    }
    updateStatus(newDBStatus, (updateStatusError) => {
      if (updateStatusError) return callback(updateStatusError)
      // hostの情報を更新
      getDBStatus({userKey: hostUserKey, userid: 'host [temp]'}, (getHostDBStatusError, hostDBStatus) => {
        if (getHostDBStatusError && getHostDBStatusError.fatal) return callback(getHostDBStatusError, null)
        if (hostDBStatus.type !== 'solo') return callback({type:'alreadyCreated', fatal: false}, null)
        // hostのDBを更新
        const newHostDBStatus = {
          ...hostDBStatus,
          status: false
        }
        updateStatus(newHostDBStatus, (updateHostStatusError) => {
          if (updateHostStatusError) return callback(updateHostStatusError)
          // 新しいDBを作成
          const newDuoDBStatus = {
            status: true,
            type: 'duo',
            createUser: hostUserKey,
            dbKey: uuidv1().split('-').join(''),
            rate: hostDBStatus.rate,
            host: hostUserKey,
            client: user.userKey,
            name: 'ふたりのおさいふ'
          }
          listDB.insert(newDuoDBStatus, (insertError) => {
            if (insertError) return callback({type: 'DBError', fatal: true}, null)
            // それぞれのおさいふを統合
            osaifuIntegration(hostDBStatus.dbKey, dbStatus.dbKey, newDuoDBStatus.dbKey, (integrationError) => {
              if (integrationError) return callback({type: 'DBError', fatal: true}, null)
              callback(null, newDuoDBStatus)
            })
          })
        })
      })
    })
  })
}

function osaifuIntegration (hostKey, clientKey, duoKey, callback) {
  const hostOsaifuDB = createOsaifuDB(hostKey)
  const clientOsaifuDB = createOsaifuDB(clientKey)
  const duoOsaifuDB = createOsaifuDB(duoKey)
  hostOsaifuDB.find({}).sort({paymentDate: -1, createdAt: -1}).exec((hostFindError, hostList) => {
    if (hostFindError) return callback({type: 'DBError', fatal: true})
    clientOsaifuDB.find({}).sort({paymentDate: -1, createdAt: -1}).exec(async (clientFindError, clientList) => {
      if (clientFindError) return callback({type: 'DBError', fatal: true})
      await insertData(hostList, duoOsaifuDB, 'host')
      await insertData(clientList, duoOsaifuDB, 'client')
      hostOsaifuDB.remove({}, {multi: true}, (hostRemoveError) => {
        if (hostRemoveError) return callback({type: 'DBError', fatal: true})
        clientOsaifuDB.remove({}, {multi: true}, (clientRemoveError) => {
          if (clientRemoveError) return callback({type: 'DBError', fatal: true})
          callback(null)
        })
      })
    })
  })
}

async function insertData (list, db, type) {
  const insert = (paymentData) => {
    return new Promise((resolve) => {
      // clientのときは反転して記録
      const newPayment = type === 'client' ? {
        ...paymentData,
        hostPayment: paymentData.clientPayment,
        clientPayment: paymentData.hostPayment
      } : {
        ...paymentData
      }
      db.insert(newPayment, () => {
        resolve()
      })
    })
  }
  for (let i = 0; i < list.length; i++) {
    await insert(list[i])
  }
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

function updateRate (user, rate, callback) {
  getDBStatus(user, (getDBStatusError, dbStatus) => {
    if (getDBStatusError && getDBStatusError.fatal) return callback(getDBStatusError, null)
    if (!dbStatus) return callback({type:'dbNotFound', fatal: false}, null)
    const newDBStatus = {
      ...dbStatus,
      rate
    }
    updateStatus(newDBStatus, (updateStatusError) => {
      return callback(updateStatusError, {...newDBStatus})
    })
  })
}


module.exports = {
  getDBStatus, createDB, createDuoDB, removeDuoDB, addPayment, getList, deletePayment, updateOsaifuname, updateRate
}