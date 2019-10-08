import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { requestConnectPass } from '../../../../Actions/Actions/Setting'
import { setTitle, setBack } from '../../../../Actions/Actions/Header'

import * as lib from '../../../../Library/Library'
import './Connect.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  connectPass: state.setting.connectPass,
  err: state.setting.err,
  user: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
  requestConnectPass: () => dispatch(requestConnectPass()),
  setTitle: (title) => dispatch(setTitle(title)),
  setBack: (back) => dispatch(setBack(back))
})

const Connect = ({
  loading, connectPass, err, user,
  requestConnectPass, setTitle, setBack
}) => {

  useEffect(() => {
    setTitle('おさいふ共有設定')
    setBack('/setting')
    return () => {
      setBack(false)
    }
  }, [])

  const showConnectPass = () => {
    if (!connectPass) return false
    return (
      <div className='connect-pass'>
        <div>{connectPass.connectPass}</div>
        <div>{lib.unixDateTime(connectPass.expire)}</div>
      </div>
    )
  }

  return (
    <div className='setting-connect'>
      <div className='form'>
        <label>おさいふを共有します</label>
        <button onClick={() => requestConnectPass()}>コード取得</button>
      </div>
      {showConnectPass()}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Connect)