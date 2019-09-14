import * as ActionType from '../Constants/Setting'

export const loading = (loading) => ({
  type: ActionType.SETTING_LOADING,
  payload: { loading }
})

export const changeName = (name) => ({
  type: ActionType.SETTING_CHANGE_NAME,
  payload: { name }
})

export const requestChangeName = () => ({
  type: ActionType.SETTING_REQUEST_CHANGE_NAME
})

export const setError = (err) => ({
  type: ActionType.SETTING_SET_ERROR,
  payload: { err }
})