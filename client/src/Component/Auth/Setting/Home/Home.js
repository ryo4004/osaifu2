import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { setTitle } from '../../../../Actions/Actions/Header'

import './Home.css'

const mapStateToProps = (state) => ({
  user: state.session.user,
  status: state.status.status
})

const mapDispatchToProps = (dispatch) => ({
  setTitle: (title) => dispatch(setTitle(title))
})

const Home = ({
  user, status,
  setTitle
}) => {

  useEffect(() => {
    setTitle('設定')
  }, [])

  const showUser = () => {
    if (!user) return false
    return (
      <div className='user'>
        <div><label>ID</label><span>{user.userid}</span></div>
        <div><label>表示名</label><span>{user.name}</span></div>
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
        <li><Link to='/setting/name'><span>名前の変更</span><i className='fas fa-chevron-right'></i></Link></li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)