import * as ActionType from '../Constants/Login'

export const loading = (loading) => ({
  type: ActionType.LOGIN_LOADING,
  payload: { loading }
})

export const changeUserid = (userid) => ({
  type: ActionType.LOGIN_CHANGE_USERID,
  payload: { userid }
})

export const changePassword = (password) => ({
  type: ActionType.LOGIN_CHANGE_PASSWORD,
  payload: { password }
})

export const requestLogin = {
  request: () => ({
    type: ActionType.LOGIN_REQUEST_LOGIN_REQUEST
  }),
  result: (result) => ({
    type: ActionType.LOGIN_REQUEST_LOGIN_RESULT,
    payload: { result }
  })
}

export const setError = (err) => ({
  type: ActionType.LOGIN_SET_ERROR,
  payload: { err }
})