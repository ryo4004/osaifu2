import * as ActionType from '../Constants/Session'

export const loading = (loading) => ({
  type: ActionType.SESSION_LOADING,
  payload: { loading }
})

export const setUser = (user) => ({
  type: ActionType.SESSION_SET_USER,
  payload: { user }
})

export const setError = (err) => ({
  type: ActionType.SESSION_SET_ERROR,
  payload: { err }
})