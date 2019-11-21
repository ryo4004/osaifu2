import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  changeUserid,
  changePassword,
  changeAgreement,
  requestSignup,
  setError
} from '../../../Actions/Actions/Signup'

import './Signup.css'

const mapStateToProps = (state) => ({
  loading: state.signup.loading,
  userid: state.signup.userid,
  password: state.signup.password,
  agreement: state.signup.agreement,
  err: state.signup.err
})

const mapDispatchToProps = (dispatch) => ({
  changeUserid: (userid) => dispatch(changeUserid(userid)),
  changePassword: (password) => dispatch(changePassword(password)),
  changeAgreement: (agreement) => dispatch(changeAgreement(agreement)),
  requestSignup: () => dispatch(requestSignup.request()),
  setError: (err) => dispatch(setError(err))
})

const Signup = ({
  loading, userid, password, agreement, err,
  changeUserid, changePassword, changeAgreement, requestSignup, setError
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
      case 'notAgreement':
        message = '利用規約およびプライバシーポリシーへの同意が必要です'
        break
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
        <div className='agreement'>
          <input type='checkbox' id='agreement' name='agreement' checked={agreement} onChange={() => changeAgreement(!agreement)} /><label htmlFor='agreement'><a href='https://osaifu.zatsuzen.com/terms'>利用規約</a>および<a href='https://osaifu.zatsuzen.com/policy'>プライバシーポリシー</a>に同意します</label>
        </div>
        {showError()}
        <button onClick={() => requestSignup()} onTouchStart={() => {}}>{buttonLabel}</button>
        <div className='login-account'>作成済みの方は<Link to='/login'>こちら</Link></div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)