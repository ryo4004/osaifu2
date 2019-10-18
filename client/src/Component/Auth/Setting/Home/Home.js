import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'

import { requestLogout } from '../../../../Actions/Actions/Session'
import { requestStatus } from '../../../../Actions/Actions/Status'
import { setTitle } from '../../../../Actions/Actions/Header'

import Forward from '../../../../Library/Icons/Forward'

import './Home.css'

const mapStateToProps = (state) => ({
  user: state.session.user,
  status: state.status.status
})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout()),
  requestStatus: () => dispatch(requestStatus()),
  setTitle: (title) => dispatch(setTitle(title))
})

const Home = ({
  user, status,
  requestLogout, requestStatus, setTitle
}) => {

  useEffect(() => {
    setTitle('設定')
    requestStatus()
  }, [])

  const logout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='alert'>
            <h1>ログアウトしますか？</h1>
            <p>ユーザー情報は端末に残りません。</p>
            <div className='button-group'>
              <button onClick={onClose}>キャンセル</button>
              <button onClick={() => {
                requestLogout()
                onClose()
              }}>ログアウト</button>
            </div>
          </div>
        )
      }
    })
  }

  const showUser = () => {
    if (!user) return false
    return (
      <div className='user'>
        <div><label>ID</label><span>{user.userid}</span></div>
        <div><label>表示名</label><span>{user.username}</span></div>
        <div><label>あいて</label><span>{user.othername}</span></div>
      </div>
    )
  }

  const showStatus = () => {
    if (!status || !user) return false
    const osaifuStatus = status.type === 'solo' ? '未使用' : (user.userKey === status.host ? 'ペアリング(host)' : 'ペアリング(client)')
    const rate = status.type === 'solo' ? status.rate : (user.userKey === status.host ? status.rate : (100 - parseInt(status.rate)))
    return (
      <div className='status'>
        <div><label>おさいふ名</label><span>{status.name}</span></div>
        <div><label>ペアリング</label><span>{osaifuStatus}</span></div>
        <div><label>負担割合</label><span>{rate}%</span></div>
      </div>
    )
  }

  return (
    <div className='setting-home'>
      {showUser()}
      {showStatus()}
      <div className='list-label'>
        <label>おさいふ共有設定</label>
      </div>
      <ul>
        <li><Link to='/setting/connect'><span>おさいふを共有する</span><Forward /></Link></li>
      </ul>
      <div className='list-label'>
        <label>おさいふの設定</label>
      </div>
      <ul>
        <li><Link to='/setting/osaifuname'><span>おさいふ名の変更</span><Forward /></Link></li>
        <li><Link to='/setting/rate'><span>負担率の変更</span><Forward /></Link></li>
      </ul>
      <div className='list-label'>
        <label>アカウント設定</label>
      </div>
      <ul>
        <li><Link to='/setting/username'><span>名前の変更</span><Forward /></Link></li>
        <li><Link to='/setting/othername'><span>相手の名前の変更</span><Forward /></Link></li>
        <li><Link to='/setting/password'><span>パスワードの変更</span><Forward /></Link></li>
      </ul>
      <ul>
        <li><button onClick={() => logout()}>ログアウト</button></li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)