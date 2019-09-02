import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  changeUserid,
  changePassword,
  requestSignup,
  setError
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
  changeUserid, changePassword, requestSignup, setError
}) => {

  useEffect(() => {
    () => setError(false)
    return () => setError(false)
  }, [])

  const showError = () => {
    if (!err) return false
    let message
    switch (err.type) {
      // Local Error
      case 'blankTextbox':
        message = 'Empty input box'
        break
      // Server Error
      case 'blankUserid':
        message = 'Blank userid'
        break
      case 'blankPassword':
        message = 'Blank password'
        break
      case 'alreadySignuped':
        message = 'Already Signuped'
        break
      case 'DBError':
        message = 'DBError'
        break
      default:
        message = 'error: ' + err.type
    }
    return (
      <div className='err'>{message}</div>
    )
  }

  const showLoading = loading ? '読み込み中' : false

  return (
    <div className='signup'>
      <h2>Signup</h2>
      <label>userid</label>
      <input type='text' value={userid} onChange={(e) => changeUserid(e.target.value)} />
      <label>password</label>
      <input type='password' value={password} onChange={(e) => changePassword(e.target.value)} />
      {showError()}
      <button onClick={() => requestSignup()}>Button</button>
      {showLoading}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)