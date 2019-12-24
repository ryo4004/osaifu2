import * as ActionType from '../Constants/Setting'

export const loading = (loading) => ({
  type: ActionType.SETTING_LOADING,
  payload: { loading }
})

// Username
export const changeUsername = (username) => ({
  type: ActionType.SETTING_CHANGE_USERNAME,
  payload: { username }
})

export const requestChangeUsername = () => ({
  type: ActionType.SETTING_REQUEST_CHANGE_USERNAME
})

// Othername
export const changeOthername = (othername) => ({
  type: ActionType.SETTING_CHANGE_OTHERNAME,
  payload: { othername }
})

export const requestChangeOthername = () => ({
  type: ActionType.SETTING_REQUEST_CHANGE_OTHERNAME
})

// Password
export const changeOldPassword = (oldPassword) => ({
  type: ActionType.SETTING_CHANGE_OLD_PASSWORD,
  payload: { oldPassword }
})

export const changeNewPassword = (newPassword) => ({
  type: ActionType.SETTING_CHANGE_NEW_PASSWORD,
  payload: { newPassword }
})

export const requestChangePassword = () => ({
  type: ActionType.SETTING_REQUEST_CHANGE_PASSWORD
})

// Userdelete
export const changeDeletePassword = (deletePassword) => ({
  type: ActionType.SETTING_CHANGE_DELETE_PASSWORD,
  payload: { deletePassword }
})

export const requestUserdelete = () => ({
  type: ActionType.SETTING_REQUEST_USERDELETE
})

// Osaifuname
export const changeOsaifuname = (osaifuname) => ({
  type: ActionType.SETTING_CHANGE_OSAIFUNAME,
  payload: { osaifuname }
})

export const requestChangeOsaifuname = () => ({
  type: ActionType.SETTING_REQUEST_CHANGE_OSAIFUNAME
})

// Rate
export const changeRate = (rate) => ({
  type: ActionType.SETTING_CHANGE_RATE,
  payload: { rate }
})

export const requestChangeRate = () => ({
  type: ActionType.SETTING_REQUEST_CHANGE_RATE
})

// Connect
export const setConnectMode = (connectMode) => ({
  type: ActionType.SETTING_SET_CONNECT_MODE,
  payload: { connectMode }
})

export const requestConnectPass = () => ({
  type: ActionType.SETTING_REQUEST_CONNECT_PASS
})

export const requestCopy = (string) => ({
  type: ActionType.SETTING_REQUEST_COPY,
  payload: { string }
})

export const setConnectPassStatus = (connectPassStatus) => ({
  type: ActionType.SETTING_SET_CONNECT_PASS_STATUS,
  payload: { connectPassStatus }
})

export const changeConnectPass = (connectPass) => ({
  type: ActionType.SETTING_CHANGE_CONNECT_PASS,
  payload: { connectPass }
})

export const requestConnect = () => ({
  type: ActionType.SETTING_REQUEST_CONNECT
})

export const requestDisconnect = () => ({
  type: ActionType.SETTING_REQUEST_DISCONNECT
})

export const setError = (err) => ({
  type: ActionType.SETTING_SET_ERROR,
  payload: { err }
})