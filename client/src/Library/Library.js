import uuidv1 from 'uuid/v1'

export const version = '0.0.1'

export function getClientid () {
  if (window.localStorage.clientid) return window.localStorage.clientid
  const clientid = uuidv1().split('-').join('')
  window.localStorage.setItem('clientid', clientid)
  return clientid
}

export function getSession () {
  return {
    userid: window.localStorage.userid,
    clientid: getClientid(),
    clientToken: window.localStorage.token,
    version
  }
}