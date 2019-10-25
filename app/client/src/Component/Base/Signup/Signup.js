import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    setError(false)
    return () => setError(false)
  }, [])

  const showError = () => {
    if (!err) return false
    let message
    switch (err.type) {
      // Local Error
      case 'blankTextbox':
        message = '入力を確認してください'
        break
      // Server Error
      case 'blankUserid':
        message = 'ユーザ名が入力されていません'
        break
      case 'blankPassword':
        message = 'パスワードが入力されていません'
        break
      case 'alreadySignuped':
        message = '指定されたユーザ名は使えません'
        break
      case 'DBError':
        message = 'データベースエラー'
        break
      default:
        message = 'error: ' + err.type
    }
    return (
      <div className='err'>{message}</div>
    )
  }

  const buttonLabel = loading ? '読み込み中' : '登録する'

  return (
    <div className='signup'>
      <div>
        <h2>アカウントの新規作成</h2>
        <input type='text' value={userid} onChange={(e) => changeUserid(e.target.value)} placeholder='ユーザ名' />
        <input type='password' value={password} onChange={(e) => changePassword(e.target.value)} placeholder='パスワード' />
        {showError()}
        <button onClick={() => requestSignup()}>{buttonLabel}</button>
        <div className='login-account'>作成済みの方は<Link to='/login'>こちら</Link></div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)