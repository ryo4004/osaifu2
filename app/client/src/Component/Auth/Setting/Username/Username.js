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
  username, user,
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

  const keyPress = (e) => {
    if (e.which === 13) requestChangeUsername()
  }

  return (
    <div className='setting-username'>
      <div className='form'>
        <label>表示名</label>
        <input type='text' value={username} onChange={(e) => changeUsername(e.target.value)} onKeyPress={(e) => keyPress(e)} />
        <button onClick={() => requestChangeUsername()}>送信</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Username)