import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeUsername, requestChangeUsername } from '../../../../Actions/Actions/Setting'
import { setTitle, setBack } from '../../../../Actions/Actions/Header'

import './Username.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  username: state.setting.username,
  err: state.setting.err,
  user: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
  changeUsername: (username) => dispatch(changeUsername(username)),
  requestChangeUsername: () => dispatch(requestChangeUsername()),
  setTitle: (title) => dispatch(setTitle(title)),
  setBack: (back) => dispatch(setBack(back))
})

const Username = ({
  loading, username, err, user,
  changeUsername, requestChangeUsername, setTitle, setBack
}) => {

  useEffect(() => {
    setTitle('名前の変更')
    setBack('/setting')
    user && changeUsername(user.username)
    return () => {
      setBack(false)
    }
  }, [])

  return (
    <div className='setting-name'>
      <div className='form'>
        <input value={username} onChange={(e) => changeUsername(e.target.value)} />
        <button onClick={() => requestChangeUsername()}>送信</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Username)