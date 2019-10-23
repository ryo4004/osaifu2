import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setConnectMode, requestConnectPass, changeConnectPass, requestConnect, setDisconnectMode, requestDisconnect, setError } from '../../../../Actions/Actions/Setting'
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
  setBack: (back) => dispatch(setBack(back)),
  setError: (err) => dispatch(setError(err))
})

const Connect = ({
  loading, connectMode, connectPassStatus, connectPass, disconnectMode, err, user, status,
  setConnectMode, requestConnectPass, changeConnectPass, requestConnect, setDisconnectMode, requestDisconnect, setTitle, setBack, setError
}) => {

  useEffect(() => {
    setConnectMode(true)
    status && (status.type === 'solo' ? setDisconnectMode(false) : setDisconnectMode(true))
    setTitle('おさいふ共有設定')
    setBack('/setting')
    setError(false)
    return () => {
      setBack(false)
      setError(false)
    }
  }, [])

  const keyPress = (e) => {
    if (e.which === 13) requestConnect()
  }

  const showForm = () => {
    if (connectMode) {
      return (
        <div>
          <div className='text'>
            <p>他のユーザーとおさいふを共有できます。</p>
            <p>既に入力されている記録は合算されます。</p>
            <p>パスの発行は何度でもできます。</p>
          </div>
          <div className='form'>
            <button onClick={() => requestConnectPass()}>パス取得</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className='text'>
            <p>共有するユーザーが発行したパスを入力してください。</p>
          </div>
          <div className='form'>
            <label>共有パスを入力してください</label>
            <input type='text' value={connectPass} onChange={(e) => changeConnectPass(e.target.value)} onKeyPress={(e) => keyPress(e)} />
            {showError()}
            <button onClick={() => requestConnect()}>送信</button>
          </div>
        </div>
      )
    }
  }

  const showConnectPass = () => {
    if (!connectPassStatus || !connectMode) return false
    const expire = lib.unixDateTime(connectPassStatus.expire).split('T')[0].replace(/-/g, '/') + ' ' + lib.unixDateTime(connectPassStatus.expire).split('T')[1].split(':')[0] + ':' + lib.unixDateTime(connectPassStatus.expire).split('T')[1].split(':')[1]
    return (
      <div className='connect-pass'>
        <div className='pass'>{connectPassStatus.connectPass}</div>
        <div className='expire'><label>有効期限(1日間)</label><div>{expire}まで</div></div>
      </div>
    )
  }

  const showSoloMode = () => {
    if (disconnectMode) return
    return (
      <div className='solo-mode'>
        <div className='switch'>
          <div onClick={() => setConnectMode(true)} className={connectMode ? 'active' : ''}>パス発行</div>
          <div onClick={() => setConnectMode(false)} className={connectMode ? '' : 'active'}>パス入力</div>
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
        <div className='text'>
          <p>共有設定を解除するとお互いのおさいふに記録が残ります。</p>
        </div>
        <div className='form'>
          {showError()}
          <button onClick={() => requestDisconnect()}>解除する</button>
        </div>
      </div>
    )
  }

  const showError = () => {
    if (!err) return false
    let message
    switch (err.type) {
      // Local Error
      case 'blankTextbox':
        message = '入力を確認してください'
        break
      // Server Error
      case 'keyNotFound':
        message = 'パスがみつかりません'
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


  return (
    <div className='setting-connect'>
      {showSoloMode()}
      {showDuoMode()}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Connect)