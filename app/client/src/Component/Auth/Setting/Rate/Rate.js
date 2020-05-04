import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeRate, requestChangeRate } from '../../../../Actions/Actions/Setting'
import { setTitle, setBack } from '../../../../Actions/Actions/Header'

import './Rate.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  rate: state.setting.rate,
  err: state.setting.err,
  user: state.session.user,
  status: state.status.status
})

const mapDispatchToProps = (dispatch) => ({
  changeRate: (rate) => dispatch(changeRate(rate)),
  requestChangeRate: () => dispatch(requestChangeRate()),
  setTitle: (title) => dispatch(setTitle(title)),
  setBack: (back) => dispatch(setBack(back))
})

const Rate = ({
  rate, user, status,
  changeRate, requestChangeRate, setTitle, setBack
}) => {

  useEffect(() => {
    setTitle('負担率の変更')
    setBack('/setting')
    if (status && user) changeRate(status.type === 'solo' ? status.rate : (status.host === user.userKey ? status.rate : (100 - parseInt(status.rate))))  
    return () => {
      setBack(false)
    }
  }, [])

  const keyPress = (e) => {
    if (e.which === 13) requestChangeRate()
  }

  const updateRate = (value) => {
    const validValue = value.replace(/[０-９]/g, (s) => {return String.fromCharCode(s.charCodeAt(0)-0xFEE0)}).replace(/[^0-9]/g, '')
    const updateValue = validValue > 100 ? 100 : (validValue < 0 ? 0 : validValue)
    changeRate(updateValue)
  }

  const selfName = user ? user.username : ''

  return (
    <div className='setting-rate'>
      <div className='text'>
        <p>負担率は、支払った合計額のうち自分が負担する割合です。</p>
        <p>2人で支払ったお金をのうち、どの程度負担するかを設定します。</p>
      </div>
      <div className='form'>
        <label>{selfName}の負担率</label>
        <input type='text' value={rate} onChange={(e) => updateRate(e.target.value)} onKeyPress={(e) => keyPress(e)} pattern='\d*' />
        <button onClick={() => requestChangeRate()}>送信</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Rate)