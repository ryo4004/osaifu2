import * as ActionType from '../Constants/Status'

export const loading = (loading) => ({
  type: ActionType.STATUS_LOADING,
  payload: { loading }
})

export const requestStatus = () => ({
  type: ActionType.STATUS_REQUEST_STATUS
})

export const setStatus = (status) => ({
  type: ActionType.STATUS_SET_STATUS,
  payload: { status }
})

export const setError = (err) => ({
  type: ActionType.STATUS_SET_ERROR,
  payload: { err }
})