import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'

import { requestLogout } from '../../../../Actions/Actions/Session'
import { setTitle } from '../../../../Actions/Actions/Header'

import './Home.css'

const mapStateToProps = (state) => ({
  user: state.session.user,
  status: state.status.status
})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout()),
  setTitle: (title) => dispatch(setTitle(title))
})

const Home = ({
  user, status,
  requestLogout, setTitle
}) => {

  useEffect(() => {
    setTitle('設定')
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
    if (!status) return false
    return (
      <div className='status'>
        <div><label>おさいふ名</label><span>{status.name}</span></div>
        <div><label>おさいふの状態</label><span>{status.user === 'host' ? 'host' : 'client'}</span></div>
      </div>
    )
  }

  return (
    <div className='setting-home'>
      {showUser()}
      {showStatus()}
      <ul>
        <li><Link to='/setting/username'><span>名前の変更</span><i className='fas fa-chevron-right'></i></Link></li>
        <li><Link to='/setting/othername'><span>相手の名前の変更</span><i className='fas fa-chevron-right'></i></Link></li>
      </ul>
      <ul>
        <li><button onClick={() => logout()}>ログアウト</button></li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)