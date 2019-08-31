import React, { useEffect } from 'react'
import { connect }from 'react-redux'

import {
  changeUserid,
  changePassword,
  requestLogin,
  setError
} from '../../../Actions/Actions/Login'

import './Login.css'

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  userid: state.login.userid,
  password: state.login.password,
  err: state.login.err
})

const mapDispatchToProps = (dispatch) => ({
  changeUserid: (userid) => dispatch(changeUserid(userid)),
  changePassword: (password) => dispatch(changePassword(password)),
  requestLogin: () => dispatch(requestLogin.request()),
  setError: (err) => dispatch(setError(err))
})

const Login = ({
  loading, userid, password, err,
  changeUserid, changePassword, requestLogin
}) => {

  useEffect(() => {
    console.log('useEffect')
    return () => setError(false)
  }, [])

  const showError = () => {
    if (!err) return false
    let message
    switch (err.type) {
      case 'blankTextbox':
        message = 'empty input box'
        break
      default:
        message = 'error: ' + err.type
    }
    // return message
    return (
      <div className='err'>{message}</div>
    )
  }

  return (
    <div className='login'>
      <h2>Login</h2>
      <label>userid</label>
      <input type='text' value={userid} onChange={(e) => changeUserid(e.target.value)} />
      <label>password</label>
      <input type='password' value={password} onChange={(e) => changePassword(e.target.value)} />
      {showError()}
      <button onClick={() => requestLogin()}>Button</button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)