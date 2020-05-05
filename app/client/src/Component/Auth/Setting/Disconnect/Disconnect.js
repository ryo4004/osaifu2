import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {  requestDisconnect, setError } from '../../../../Actions/Actions/Setting'
import { setTitle, setBack } from '../../../../Actions/Actions/Header'

import './Disconnect.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  err: state.setting.err
})

const mapDispatchToProps = (dispatch) => ({
  requestDisconnect: () => dispatch(requestDisconnect()),
  setTitle: (title) => dispatch(setTitle(title)),
  setBack: (back) => dispatch(setBack(back)),
  setError: (err) => dispatch(setError(err))
})

const Disconnect = ({
  loading, err,
  requestDisconnect, setTitle, setBack, setError
}) => {

  useEffect(() => {
    setTitle('おさいふ共有設定')
    setBack('/setting')
    setError(false)
    return () => {
      setBack(false)
      setError(false)
    }
  }, [])

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
      <div className='text'>
        <p>共有設定を解除するとお互いのおさいふに記録が残ります。</p>
      </div>
      <div className='form'>
        {showError()}
        <button onClick={() => requestDisconnect()}>{loading ? '読み込み中' : '解除する'}</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Disconnect)