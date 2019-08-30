import * as ActionType from '../Constants/Login'

const loading = (loading) => ({
  type: ActionType.LOGIN_LOADING,
  payload: { loading }
})

export const changeUserid = (userid) => ({
  type: ActionType.LOGIN_CHANGE_USER,
  prefix: { userid }
})

export const changePassword = (password) => ({
  type: ActionType.LOGIN_CHANGE_PASSWORD,
  prefix: { password }
})

export const requestLogin = () => ({
  
})