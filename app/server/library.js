function getHash (string) {
  const salt = '::i5lhYCN4zYgc9c1Y'
  const crypto = require('crypto')
  const hashsum = crypto.createHash('sha512')
  hashsum.update(string + salt)
  return hashsum.digest('hex')
}

function createToken (clientid) {
  return getHash(clientid + (new Date()).getTime())
}

function getToken (id, user) {
  if (!user) return false
  if (!('clientList' in user)) return false
  const client = user.clientList.filter((e) => {return e.id === id})
  if (client.length === 0) return false
  return client[0].token
}

function showTime () {
  const time = new Date()
  const z = (v) => {
    const s = '00' + v
    return s.substr(s.length - 2, 2)
  }
  return time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate() + ' ' + z(time.getHours()) + ':' + z(time.getMinutes()) + ':' + z(time.getSeconds())
}

function time () {
  return '[' + showTime() + '] '
}

function getRandomString (length){
  const strong = Math.pow(10, length + 1)
  return Math.floor(strong * Math.random()).toString(16)
}

module.exports = {
  getHash, createToken, getToken,
  showTime, time, getRandomString
}