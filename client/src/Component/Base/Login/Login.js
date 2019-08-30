import React from 'react'
import { connect }from 'react-redux'

import {
  changeUserid,
  changePassword,
  requestLogin
} from '../../../Actions/Actions/Login'

const mapStateToProps = (state) => ({
  userid: state.login.userid,
  password: state.login.password
})

const mapDispatchToProps = (dispatch) => ({
  changeUserid: (userid) => dispatch(changeUserid(userid)),
  changePassword: (password) => dispatch(changePassword(password)),
  requestLogin: () => dispatch(requestLogin())
})

const Login = () => {
  return (
    <div>
      Login
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)