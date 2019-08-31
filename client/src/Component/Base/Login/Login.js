import React from 'react'
import { connect }from 'react-redux'

import {
  changeUserid,
  changePassword,
  requestLogin
} from '../../../Actions/Actions/Login'

import './Login.css'

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  userid: state.login.userid,
  password: state.login.password
})

const mapDispatchToProps = (dispatch) => ({
  changeUserid: (userid) => dispatch(changeUserid(userid)),
  changePassword: (password) => dispatch(changePassword(password)),
  requestLogin: () => dispatch(requestLogin.request())
})

const Login = ({
  loading, userid, password,
  changeUserid = () => {},
  changePassword = () => {},
  requestLogin = () => {}
}) => {
  return (
    <div className='login'>
      <h2>Login</h2>
      <label>userid</label>
      <input type='text' value={userid} onChange={(e) => changeUserid(e.target.value)} />
      <label>password</label>
      <input type='password' value={password} onChange={(e) => changePassword(e.target.value)} />
      <button onClick={requestLogin}>Button</button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)