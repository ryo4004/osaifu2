import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  setPayment,
  setPaymentCheck,
  setSelfPayment,
  setOtherPayment,
  setMemo,
  sendPayment
} from '../../../Actions/Actions/Payment'
import { setTitle } from '../../../Actions/Actions/Header'

import './Payment.css'

const mapStateToProps = (state) => ({
  payment: state.payment.payment,
  paymentCheck: state.payment.paymentCheck,
  selfPayment: state.payment.selfPayment,
  otherPayment: state.payment.otherPayment,
  memo: state.payment.memo,
})

const mapDispatchToProps = (dispatch) => ({
  setPayment: (payment) => dispatch(setPayment(payment)),
  setPaymentCheck: (paymentCheck) => dispatch(setPaymentCheck(paymentCheck)),
  setSelfPayment: (selfPayment) => dispatch(setSelfPayment(selfPayment)),
  setOtherPayment: (otherPayment) => dispatch(setOtherPayment(otherPayment)),
  setMemo: (memo) => dispatch(setMemo(memo)),
  setTitle: (title) => dispatch(setTitle(title))
})

const Payment = ({
  payment, paymentCheck, selfPayment, otherPayment, memo,
  setPayment, setPaymentCheck, setSelfPayment, setOtherPayment, setMemo, setTitle
}) => {

  useEffect(() => {
    setTitle('支払い')
  }, [])

  const changeValue = (type, value) => {
    const validValue = value.replace(/[０-９]/g, (s) => {return String.fromCharCode(s.charCodeAt(0)-0xFEE0)}).replace(/[^0-9]/g, '')
    if (value && !isNaN(validValue)) {
      calcEachPayment(type, validValue)
      type === 'payment' && setPayment(parseInt(validValue))
      // calcPay(type, value, rate)
    } else {
      if (type === 'payment') {
        setPayment('')
        setSelfPayment('')
        setOtherPayment('')
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
    console.log(value, selfPayment, otherPayment)
    if (selfPayment !== 0 && otherPayment === 0) {
      setPaymentCheck('self')
    } else if (selfPayment === 0 && otherPayment !== 0) {
      setPaymentCheck('other')
    } else {
      setPaymentCheck(false)
    }
    setSelfPayment(parseInt(selfPayment))
    setOtherPayment(parseInt(otherPayment))
  }

  const keyPress = (e) => {
    if (e.which === 13) sendPayment()
  }

  const updateCheck = (e) => {
    setPaymentCheck(e.target.id)
    setSelfPayment(e.target.id === 'self' ? payment : 0)
    setOtherPayment(e.target.id === 'other' ? payment : 0)
  }

  const inputClass = payment ? 'input' : 'empty'
  return (
    <div className='payment contents'>
      <div className='contents-inner'>
        <h2>Payment</h2>
        <label className={inputClass}>支払額</label>
        <input
          type='text'
          value={String(payment)}
          onChange={(e) => changeValue('payment',e.target.value)}
          onKeyPress={(e) => keyPress(e)}
          pattern='\d*'
          placeholder='ユーザ名'
        />

        <label className='memo'>メモ</label>
        <input
          type='text'
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
          placeholder='メモ'
        />

        <label>支払担当</label>
        <div className='payment-check'>
          <input type='radio' id='self' onChange={(e) => updateCheck(e)} checked={paymentCheck === 'self'} />
          <label htmlFor='self'>self</label>
          <input type='radio' id='other' onChange={(e) => updateCheck(e)} checked={paymentCheck === 'other'} />
          <label htmlFor='other'>other</label>
        </div>

        <label className='memo'>自分</label>
        <input
          type='text'
          value={String(selfPayment)}
          onChange={(e) => changeValue('selfPayment',e.target.value)}
          onKeyPress={(e) => keyPress(e)}
          pattern='\d*'
          placeholder='自分'
        />

        <label className='memo'>相手</label>
        <input
          type='text'
          value={String(otherPayment)}
          onChange={(e) => changeValue('otherPayment',e.target.value)}
          onKeyPress={(e) => keyPress(e)}
          pattern='\d*'
          placeholder='相手'
        />

      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)