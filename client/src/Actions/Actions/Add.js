import * as ActionType from '../Constants/Add'

export const loading = (loading) => ({
  type: ActionType.ADD_LOADING,
  payload: { loading }
})

export const setModal = (modal) => ({
  type: ActionType.ADD_SET_MODAL,
  payload: { modal }
})

export const changeName = (name) => ({
  type: ActionType.ADD_CHANGE_NAME,
  payload: { name }
})

export const requestCreateOsaifu = () => ({
  type: ActionType.ADD_REQUEST_CREATE_OSAIFU
})

export const setError = (err) => ({
  type: ActionType.ADD_SET_ERROR,
  payload: { err }
})