import * as ActionType from '../Constants/Setting'

export const loading = (loading) => ({
  type: ActionType.SETTING_LOADING,
  payload: { loading }
})

export const changeUsername = (username) => ({
  type: ActionType.SETTING_CHANGE_USERNAME,
  payload: { username }
})

export const requestChangeUsername = () => ({
  type: ActionType.SETTING_REQUEST_CHANGE_USERNAME
})

export const changeOthername = (othername) => ({
  type: ActionType.SETTING_CHANGE_OTHERNAME,
  payload: { othername }
})

export const requestChangeOthername = () => ({
  type: ActionType.SETTING_REQUEST_CHANGE_OTHERNAME
})

export const setError = (err) => ({
  type: ActionType.SETTING_SET_ERROR,
  payload: { err }
})