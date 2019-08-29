export const prefix = 'LOGIN'

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

export const changeUserid = (userid) => ({
  type: prefix + 'CHANGE_USER',
  prefix: { userid }
})

export const changePassword = (password) => ({
  type: prefix + 'CHANGE_PASSWORD',
  prefix: { password }
})

export const requestLogin = () => ({
  
})