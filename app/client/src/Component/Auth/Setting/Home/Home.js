import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'

import { requestLogout } from '../../../../Actions/Actions/Session'
import { requestStatus } from '../../../../Actions/Actions/Status'
import { setTitle } from '../../../../Actions/Actions/Header'
import { setModal } from '../../../../Actions/Actions/Tutorial'

import Forward from '../../../../Library/Icons/Forward'

import './Home.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  user: state.session.user,
  status: state.status.status
})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout()),
  requestStatus: () => dispatch(requestStatus()),
  setTitle: (title) => dispatch(setTitle(title)),
  setModal: (modal) => dispatch(setModal(modal))
})

const Home = ({
  loading, user, status,
  requestLogout, requestStatus, setTitle, setModal
}) => {

  useEffect(() => {
    setTitle('設定')
    requestStatus()
  }, [])

  const logout = () => {
    confirmAlert({
      customUI: function showModal ({ onClose }) {
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

  const showStatus = () => {
    if (!status || !user) return false
    const rate = status.type === 'solo' ? status.rate : (user.userKey === status.host ? status.rate : (100 - parseInt(status.rate)))
    const showPair = () => {
      const osaifuStatus = status.type === 'solo' ? <span>オフ</span> : (user.userKey === status.host ? <span>ペアリング<span>host</span></span> : <span>ペアリング<span>client</span></span>)
      if (status.type === 'solo') return <div><label>ペアリング</label><span>{osaifuStatus}</span></div>
      return (
        <details>
          <summary><div className='pair-summary'><label>ペアリング</label><span>{osaifuStatus}</span></div></summary>
          <div className='pair'>
            <div className='key'><span className={status.host === user.userKey ? 'self' : 'other'}>{status.host === user.userKey ? 'You' : 'Partner'}</span><span>{status.host.substr(0, 8)}</span></div>
            <div className='key'><span className={status.client === user.userKey ? 'self' : 'other'}>{status.client === user.userKey ? 'You' : 'Partner'}</span><span>{status.client.substr(0, 8)}</span></div>
          </div>
        </details>
      )
    }
    return (
      <div className='osaifu'>
        <div><label>おさいふ名</label><span>{status.name}</span></div>
        {showPair()}
        <div><label>負担割合</label><span>{rate}%</span></div>
      </div>
    )
  }
  
  const showUser = () => {
    if (!status || !user) return false
    const othername = status.type === 'solo' ? <div><label>相手の名前</label><span>{user.othername}</span></div> : false
    return (
      <div className='user'>
        <div><label>ID</label><span>{user.userid}</span></div>
        <div><label>Key</label><span>{user.userKey.substr(0, 8)}</span></div>
        <div><label>名前</label><span>{user.username}</span></div>
        {othername}
      </div>
    )
  }

  const showLoading = () => {
    if (loading) return <div className='loading'>読み込み中...</div>
  }

  const connect = status && (status.type === 'solo' ? <li><Link to='/setting/connect'><span>おさいふを共有する</span><Forward /></Link></li> : <li><Link to='/setting/disconnect'><span>共有を解除する</span><Forward /></Link></li>)
  const othername = status && (status.type === 'solo' ? <li><Link to='/setting/othername'><span>相手の名前の変更</span><Forward /></Link></li> : false)

  return (
    <div className='setting-home'>
      {showLoading()}
      <div className='status'>
        <label>現在の状態</label>
        {showStatus()}
        {showUser()}
      </div>
      <div className='list-label'>
        <label>おさいふ共有設定</label>
      </div>
      <ul>
        {connect}
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
        {othername}
        <li><Link to='/setting/password'><span>パスワードの変更</span><Forward /></Link></li>
        <li><Link to='/setting/userdelete'><span>アカウントの削除</span><Forward /></Link></li>
      </ul>
      <ul>
        <li><button onClick={() => setModal(true)} onTouchStart={() => {}}>チュートリアルを開く</button></li>
        <li><button onClick={() => logout()} onTouchStart={() => {}}>ログアウト</button></li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)