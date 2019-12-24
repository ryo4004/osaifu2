import uuidv1 from 'uuid/v1'

export const version = '0.0.1'

export function getClientid () {
  if (window.localStorage.clientid) return window.localStorage.clientid
  const clientid = uuidv1().split('-').join('')
  window.localStorage.setItem('clientid', clientid)
  return clientid
}

export function updateToken (token) {
  window.localStorage.setItem('token', token)
}

export function updateUserid (userid) {
  window.localStorage.setItem('userid', userid)
}

export function getSession () {
  return {
    userid: window.localStorage.userid,
    clientid: getClientid(),
    clientToken: window.localStorage.token,
    version
  }
}

export function unixDateTime (timestamp) {
  const date = new Date(parseInt(timestamp))
  var Y = date.getFullYear()
  var m = ('0' + (date.getMonth() + 1)).slice(-2)
  var d = ('0' + date.getDate()).slice(-2)
  var H = ('0' + date.getHours()).slice(-2)
  var i = ('0' + date.getMinutes()).slice(-2)
  var s = ('0' + date.getSeconds()).slice(-2)
  return Y + '-' + m + '-' + d + 'T' + H + ':' + i + ':' + s
}

export function unixDate (timestamp) {
  var d = new Date(parseInt(timestamp))
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()
  return(year + '-' + month + '-' + day)
}

export function unixTime (timestamp) {
  var d = new Date(parseInt(timestamp))
  var hour = ('0' + d.getHours()).slice(-2)
  var min  = ('0' + d.getMinutes()).slice(-2)
  return(hour + ':' + min);
}

export function addSeparator (num) {
  return num.toLocaleString()
}

export function getSymbol (value) {
  if (value > 0) {
    return '+'
  } else if (value < 0) {
    return '-'
  }
  return ''
}

export function getJudgement (value) {
  if (value > 0) {
    return '多く払っています'
  } else if (value < 0) {
    return '足りないです'
  }
  return 'ちょうどよいです'
}

export function copy (string) {
  const div = document.createElement('div')
  const pre = document.createElement('pre')
  pre.style.webkitUserSelect = 'auto'
  pre.style.userSelect = 'auto'
  div.appendChild(pre).textContent = string
  document.body.appendChild(div)
  document.getSelection().selectAllChildren(div)
  const result = document.execCommand('copy')
  document.body.removeChild(div)
  return result
}
