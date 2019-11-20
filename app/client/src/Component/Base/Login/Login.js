import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

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
  changeUserid, changePassword, requestLogin, setError
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
      case 'userNotFound':
        message = 'ユーザが見つかりません'
        break
      case 'passwordWrong':
        message = 'パスワードが間違っています'
        break
      case 'updateUserNotFound':
        message = 'データアップデートエラー'
        break
      case 'updateUserError':
        message = 'データベースエラー'
        break
      default:
        message = 'error: ' + err.type
    }
    return (
      <div className='err'>{message}</div>
    )
  }

  const buttonLabel = loading ? '読み込み中' : 'ログイン'

  return (
    <div className='login'>
      <div>
        <h2>ログイン</h2>
        <input type='text' value={userid} onChange={(e) => changeUserid(e.target.value)} placeholder='ユーザ名' />
        <input type='password' value={password} onChange={(e) => changePassword(e.target.value)} placeholder='パスワード' />
        {showError()}
        <button onClick={() => requestLogin()} onTouchStart={() => {}}>{buttonLabel}</button>
        <div className='add-account'>アカウントの作成は<Link to='/signup'>こちら</Link></div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)