import * as ActionType from '../Constants/Signup'

const loading = (loading) => ({
  type: ActionType.SIGNUP_LOADING,
  payload: { loading }
})

export const changeUserid = (userid) => ({
  type: ActionType.SIGNUP_CHANGE_USERID,
  payload: { userid }
})

export const changePassword = (password) => ({
  type: ActionType.SIGNUP_CHANGE_PASSWORD,
  payload: { password }
})

export const requestSignup = {
  request: () => ({
    type: ActionType.SIGNUP_REQUEST_SIGNUP_REQUEST
  }),
  result: () => ({
    type: ActionType.SIGNUP_REQUEST_SIGNUP_RESULT,
    payload: { result }
  })
}

export const setError = () => ({
  type: ActionType.SIGNUP_SET_ERROR,
  payload: { err }
})