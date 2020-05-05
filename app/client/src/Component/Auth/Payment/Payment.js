import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  setModal,
  setUseDate,
  setDate,
  setPayment,
  setPaymentCheck,
  setSelfPayment,
  setOtherPayment,
  setMemo,
  sendPayment,
  setError
} from '../../../Actions/Actions/Payment'

import * as lib from '../../../Library/Library'

import './Payment.css'

const mapStateToProps = (state) => ({
  loading: state.payment.loading,
  modal: state.payment.modal,
  useDate: state.payment.useDate,
  date: state.payment.date,
  payment: state.payment.payment,
  paymentCheck: state.payment.paymentCheck,
  selfPayment: state.payment.selfPayment,
  otherPayment: state.payment.otherPayment,
  memo: state.payment.memo,
  err: state.payment.err,

  sessionLoading: state.session.loading,
  user: state.session.user,
  statusLoading: state.status.loading,
  status: state.status.status
})

const mapDispatchToProps = (dispatch) => ({
  setModal: (modal) => dispatch(setModal(modal)),
  setUseDate: (useDate) => dispatch(setUseDate(useDate)),
  setDate: (date) => dispatch(setDate(date)),
  setPayment: (payment) => dispatch(setPayment(payment)),
  setPaymentCheck: (paymentCheck) => dispatch(setPaymentCheck(paymentCheck)),
  setSelfPayment: (selfPayment) => dispatch(setSelfPayment(selfPayment)),
  setOtherPayment: (otherPayment) => dispatch(setOtherPayment(otherPayment)),
  setMemo: (memo) => dispatch(setMemo(memo)),
  sendPayment: () => dispatch(sendPayment()),
  setError: (err) => dispatch(setError(err))
})

const Payment = ({
  loading, modal, useDate, date, payment, paymentCheck, selfPayment, otherPayment, memo, err, user, status,
  setModal, setUseDate, setDate, setPayment, setPaymentCheck, setSelfPayment, setOtherPayment, setMemo, sendPayment
}) => {

  useEffect(() => {
    if (modal) {
      focus()
    }
    return () => {}
  }, [modal])

  let input = React.createRef()

  function focus () {
    input.current.focus()
  }
  
  const resetDate = () => {
    const time = new Date()
    setDate(time.getFullYear() + '-' + ('00' + (time.getMonth() + 1)).slice(-2) + '-' + ('00' + time.getDate()).slice(-2))
    setUseDate(false)
  }

  const changeValue = (type, value) => {
    const validValue = value.replace(/[０-９]/g, (s) => {return String.fromCharCode(s.charCodeAt(0)-0xFEE0)}).replace(/[^0-9]/g, '')
    if (value && !isNaN(validValue)) {
      calcEachPayment(type, validValue)
      if (type === 'payment') {
        validValue > 1e16 ? setPayment(parseInt(payment)) : setPayment(parseInt(validValue))
      }
      // calcPay(type, value, rate)
    } else {
      if (type === 'payment') {
        setPayment('')
        setSelfPayment('')
        setOtherPayment('')
        setPaymentCheck('split')
      } else {
        calcEachPayment(type, 0)
      }
    }
  }

  const maxHold = (value, max) => {
    if (value > max) {
      return max
    } else if (value <= 0) {
      return 0
    } else {
      return value
    }
  }

  const calcEachPayment = (type, value) => {
    let selfPayment, otherPayment
    if (type === 'selfPayment') {
      selfPayment = maxHold(value, payment)
      otherPayment = payment - selfPayment
    } else if (type === 'otherPayment') {
      otherPayment = maxHold(value, payment)
      selfPayment = payment - otherPayment
    } else if (type === 'payment') {
      selfPayment = value
      otherPayment = 0
    }
    if (selfPayment !== 0 && otherPayment === 0) {
      setPaymentCheck('self')
    } else if (selfPayment === 0 && otherPayment !== 0) {
      setPaymentCheck('other')
    } else {
      setPaymentCheck('split')
    }
    setSelfPayment(parseInt(selfPayment))
    setOtherPayment(parseInt(otherPayment))
  }

  const updateUseDate = () => {
    resetDate()
    setUseDate(!useDate)
  }

  const updateDate = (date) => {
    setUseDate(true)
    setDate(date)
  }

  const updateCheck = (e) => {
    if (e.target.id === 'split' && (payment === selfPayment || payment === otherPayment)) return
    setPaymentCheck(e.target.id)
    setSelfPayment(e.target.id === 'self' ? payment : 0)
    setOtherPayment(e.target.id === 'other' ? payment : 0)
  }

  const keyPress = (e) => {
    if (e.which === 13) sendPayment()
  }

  const showUseDate = () => {
    if (!useDate) return
    return (
      <div className='use-date'>
        <input type='checkbox' id='date' onChange={() => updateUseDate()} checked={useDate === true} />
        <label htmlFor='date'><i className='fas fa-times-circle'></i></label>
      </div>  
    )
  }

  const showError = () => {
    if (!err) return false
    let message
    switch (err.type) {
      // Local Error
      case 'blankPayment':
        message = '支払額が指定されていません'
        break
      // Server Error
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

  const modalClass = modal ? ' open' : ' close'

  const dateClass = useDate ? ' use' : ''
  const inputClass = payment ? 'input' : 'empty'
  const selfName = user ? user.username : ''
  const otherName = status ? status.othername : ''
  const disabledPayment = payment ? false : true
  const disabledLoading = !loading ? false : true
  const buttonLabel = loading ? '読み込み中' : '登録'

  return (
    <div className='payment contents'>
      <div className={'modal-contents' + modalClass}>
        <header>
          <button className='cancel' onClick={() => setModal(false)}><label>キャンセル</label></button>
          <h2>支払い</h2>
          <button className='add' onClick={() => sendPayment()} disabled={disabledPayment || disabledLoading}><label>{buttonLabel}</label></button>
        </header>
        <div className='contents'>
          <div className='contents-inner-modal'>
            <div className='form'>
              <div className={'date' + dateClass}>
                <label>日付</label>
                <input type='date' value={date} onChange={(e) => updateDate(e.target.value)} disabled={disabledLoading} />
                {showUseDate()}
              </div>
              <div className='payment'>
                <label className={inputClass}>支払額</label>
                <div>
                  <input
                    ref={input}
                    type='text'
                    value={String(lib.addSeparator(payment))}
                    onChange={(e) => changeValue('payment', e.target.value)}
                    onKeyPress={(e) => keyPress(e)}
                    pattern='\d*'
                    placeholder='0'
                    disabled={disabledLoading}
                  />
                  <span>円</span>
                </div>
              </div>

              <div className='memo'>
                <label>メモ</label>
                <input
                  type='text'
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  onKeyPress={(e) => keyPress(e)}
                  placeholder='未入力'
                  disabled={disabledLoading}
                />
              </div>

              <div className='each-payment'>
                <label>支払分担</label>
                <div>
                  <label>{selfName}</label>
                  <div className='payment-check'>
                    <input type='radio' id='self' onChange={(e) => updateCheck(e)} checked={paymentCheck === 'self'} />
                    <label htmlFor='self' className='self'>全額</label>
                  </div>
                  <div className='self-payment'>
                    <input
                      type='text'
                      value={String(lib.addSeparator(selfPayment))}
                      onChange={(e) => changeValue('selfPayment', e.target.value)}
                      onKeyPress={(e) => keyPress(e)}
                      pattern='\d*'
                      placeholder='0'
                      disabled={disabledPayment || disabledLoading}
                    />
                    <span>円</span>
                  </div>
                </div>
                <div>
                  <label>{otherName}</label>
                  <div className='payment-check'>
                    <input type='radio' id='other' onChange={(e) => updateCheck(e)} checked={paymentCheck === 'other'} />
                    <label htmlFor='other' className='other'>全額</label>
                  </div>
                  <div className='other-payment'>
                    <input
                      type='text'
                      value={String(lib.addSeparator(otherPayment))}
                      onChange={(e) => changeValue('otherPayment', e.target.value)}
                      onKeyPress={(e) => keyPress(e)}
                      pattern='\d*'
                      placeholder='0'
                      disabled={disabledPayment || disabledLoading}
                    />
                    <span>円</span>
                  </div>
                </div>
              </div>

              {showError()}

              <div className='button'>
                <button onClick={() => sendPayment()} disabled={disabledPayment || disabledLoading} onTouchStart={() => {}}>{buttonLabel}</button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className={'modal-background' + modalClass}></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)