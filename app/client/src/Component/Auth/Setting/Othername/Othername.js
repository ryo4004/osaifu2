import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeOthername, requestChangeOthername } from '../../../../Actions/Actions/Setting'
import { setTitle, setBack } from '../../../../Actions/Actions/Header'

import './Othername.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  othername: state.setting.othername,
  err: state.setting.err,
  user: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
  changeOthername: (name) => dispatch(changeOthername(name)),
  requestChangeOthername: () => dispatch(requestChangeOthername()),
  setTitle: (title) => dispatch(setTitle(title)),
  setBack: (back) => dispatch(setBack(back))
})

const Othername = ({
  othername, user,
  changeOthername, requestChangeOthername, setTitle, setBack
}) => {

  useEffect(() => {
    setTitle('相手の名前の変更')
    setBack('/setting')
    user && changeOthername(user.othername)
    return () => {
      setBack(false)
    }
  }, [])

  const keyPress = (e) => {
    if (e.which === 13) requestChangeOthername()
  }

  return (
    <div className='setting-othername'>
      <div className='form'>
      <label>相手の表示名</label>
        <input type='text' value={othername} onChange={(e) => changeOthername(e.target.value)} onKeyPress={(e) => keyPress(e)} />
        <button onClick={() => requestChangeOthername()}>送信</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Othername)