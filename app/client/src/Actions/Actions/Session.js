import * as ActionType from '../Constants/Session'

export const loading = (loading) => ({
  type: ActionType.SESSION_LOADING,
  payload: { loading }
})

export const requestAuth = () => ({
  type: ActionType.SESSION_REQUEST_AUTH
})

export const requestLogout = () => ({
  type: ActionType.SESSION_REQUEST_LOGOUT
})

export const setUser = (user) => ({
  type: ActionType.SESSION_SET_USER,
  payload: { user }
})

export const setError = (err) => ({
  type: ActionType.SESSION_SET_ERROR,
  payload: { err }
})