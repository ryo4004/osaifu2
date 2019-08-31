import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  changeUserid,
  changePassword,
  requestSignup
} from '../../../Actions/Actions/Signup'

import './Signup.css'

const mapStateToProps = (state) => ({
  loading: state.signup.loading,
  userid: state.signup.userid,
  password: state.signup.password,
  err: state.signup.err
})

const mapDispatchToProps = (dispatch) => ({
  changeUserid: (userid) => dispatch(changeUserid(userid)),
  changePassword: (password) => dispatch(changePassword(password)),
  requestSignup: () => dispatch(requestSignup.request()),
  setError: (err) => dispatch(setError(err))
})

const Signup = ({
  loading, userid, password, err,
  changeUserid, changePassword, requestSignup
}) => {

  useEffect(() => {
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
    return (
      <div className='err'>{message}</div>
    )
  }

  return (
    <div className='signup'>
      <h2>Signup</h2>
      <label>userid</label>
      <input type='text' value={userid} onChange={(e) => changeUserid(e.target.value)} />
      <label>password</label>
      <input type='password' value={password} onChange={(e) => changePassword(e.target.value)} />
      {showError()}
      <button onClick={() => requestSignup()}>Button</button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)