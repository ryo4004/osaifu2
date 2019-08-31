import React from 'react'
import { connect }from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  changeUserid,
  changePassword,
  requestLogin
} from '../../../Actions/Actions/Login'

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
    <div>
      Login
      <button onClick={requestLogin}>Button</button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)