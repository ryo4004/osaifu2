import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setConnectMode, requestConnectPass, changeConnectPass, requestConnect, setDisconnectMode, requestDisconnect } from '../../../../Actions/Actions/Setting'
import { setTitle, setBack } from '../../../../Actions/Actions/Header'

import * as lib from '../../../../Library/Library'
import './Connect.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  connectMode: state.setting.connectMode,
  connectPassStatus: state.setting.connectPassStatus,
  connectPass: state.setting.connectPass,
  disconnectMode: state.setting.disconnectMode,
  err: state.setting.err,
  user: state.session.user,
  status: state.status.status
})

const mapDispatchToProps = (dispatch) => ({
  setConnectMode: (connectMode) => dispatch(setConnectMode(connectMode)),
  requestConnectPass: () => dispatch(requestConnectPass()),
  changeConnectPass: (connectPass) => dispatch(changeConnectPass(connectPass)),
  requestConnect: () => dispatch(requestConnect()),
  setDisconnectMode: (disconnectMode) => dispatch(setDisconnectMode(disconnectMode)),
  requestDisconnect: () => dispatch(requestDisconnect()),
  setTitle: (title) => dispatch(setTitle(title)),
  setBack: (back) => dispatch(setBack(back))
})

const Connect = ({
  loading, connectMode, connectPassStatus, connectPass, disconnectMode, err, user, status,
  setConnectMode, requestConnectPass, changeConnectPass, requestConnect, setDisconnectMode, requestDisconnect, setTitle, setBack
}) => {

  useEffect(() => {
    setConnectMode(true)
    status && (status.type === 'solo' ? setDisconnectMode(false) : setDisconnectMode(true))
    setTitle('おさいふ共有設定')
    setBack('/setting')
    return () => {
      setBack(false)
    }
  }, [])

  const keyPress = (e) => {
    if (e.which === 13) requestConnect()
  }

  const showForm = () => {
    if (connectMode) {
      return (
        <div className='form'>
          <label>おさいふを共有します</label>
          <button onClick={() => requestConnectPass()}>コード取得</button>
        </div>
      )
    } else {
      return (
        <div className='form'>
          <label>共有パスを入力してください</label>
          <input type='text' value={connectPass} onChange={(e) => changeConnectPass(e.target.value)} onKeyPress={(e) => keyPress(e)} />
          <button onClick={() => requestConnect()}>送信</button>
        </div>
      )
    }
  }

  const showConnectPass = () => {
    if (!connectPassStatus || !connectMode) return false
    return (
      <div className='connect-pass'>
        <div>{connectPassStatus.connectPass}</div>
        <div>{lib.unixDateTime(connectPassStatus.expire)}</div>
      </div>
    )
  }

  const showSoloMode = () => {
    if (disconnectMode) return
    return (
      <div className='solo-mode'>
        <div className='switch'>
          <div onClick={() => setConnectMode(true)} className={connectMode ? 'active' : ''}>コード発行</div>
          <div onClick={() => setConnectMode(false)} className={connectMode ? '' : 'active'}>コード入力</div>
        </div>
        {showForm()}
        {showConnectPass()}
      </div>
    )
  }

  const showDuoMode = () => {
    if (!disconnectMode) return
    return (
      <div className='duo-mode'>
        <div className='form'>
          <button onClick={() => requestDisconnect()}>解除する</button>
        </div>
      </div>
    )
  }

  return (
    <div className='setting-connect'>
      {showSoloMode()}
      {showDuoMode()}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Connect)