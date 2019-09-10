import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  setDate,
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
  date: state.payment.date,
  payment: state.payment.payment,
  paymentCheck: state.payment.paymentCheck,
  selfPayment: state.payment.selfPayment,
  otherPayment: state.payment.otherPayment,
  memo: state.payment.memo,
})

const mapDispatchToProps = (dispatch) => ({
  setDate: (date) => dispatch(setDate(date)),
  setPayment: (payment) => dispatch(setPayment(payment)),
  setPaymentCheck: (paymentCheck) => dispatch(setPaymentCheck(paymentCheck)),
  setSelfPayment: (selfPayment) => dispatch(setSelfPayment(selfPayment)),
  setOtherPayment: (otherPayment) => dispatch(setOtherPayment(otherPayment)),
  setMemo: (memo) => dispatch(setMemo(memo)),
  setTitle: (title) => dispatch(setTitle(title))
})

const Payment = ({
  date, payment, paymentCheck, selfPayment, otherPayment, memo,
  setDate, setPayment, setPaymentCheck, setSelfPayment, setOtherPayment, setMemo, setTitle
}) => {

  useEffect(() => {
    setTitle('支払い')
    const time = new Date()
    setDate(time.getFullYear() + '-' + ('00' + (time.getMonth() + 1)).slice(-2) + '-' + ('00' + time.getDate()).slice(-2))
  }, [])

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

  const keyPress = (e) => {
    if (e.which === 13) sendPayment()
  }

  const updateCheck = (e) => {
    if (e.target.id === 'split' && (payment === selfPayment || payment === otherPayment)) return
    setPaymentCheck(e.target.id)
    setSelfPayment(e.target.id === 'self' ? payment : 0)
    setOtherPayment(e.target.id === 'other' ? payment : 0)
  }

  const inputClass = payment ? 'input' : 'empty'

  return (
    <div className='payment contents'>
      <div className='contents-inner'>
        <div className='form'>
          <div className='date'>
            <label>日付</label>
            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className='payment'>
            <label className={inputClass}>支払額</label>
            <div>
              {/* <span><i className='fas fa-yen-sign'></i></span> */}
              {/* <span>&yen;</span> */}
              <input
                type='text'
                value={String(payment)}
                onChange={(e) => changeValue('payment',e.target.value)}
                onKeyPress={(e) => keyPress(e)}
                pattern='\d*'
                placeholder='0'
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
            />
          </div>

          <div className='payment-check'>
            <label>支払分担</label>
            <div>
              <input type='radio' id='self' onChange={(e) => updateCheck(e)} checked={paymentCheck === 'self'} />
              <label htmlFor='self' className='self'>あなた</label>
              <input type='radio' id='other' onChange={(e) => updateCheck(e)} checked={paymentCheck === 'other'} />
              <label htmlFor='other' className='other'>あいて</label>
              <input type='radio' id='split' onChange={(e) => updateCheck(e)} checked={paymentCheck === 'split'} />
              <label htmlFor='split' className='split'>分担</label>
            </div>
          </div>

          <div className='each-payment'>

            <div>
              <input
                type='text'
                value={String(selfPayment)}
                onChange={(e) => changeValue('selfPayment', e.target.value)}
                onKeyPress={(e) => keyPress(e)}
                pattern='\d*'
                placeholder='0'
              />
              <span>円</span>
            </div>

            <div>
              <input
                type='text'
                value={String(otherPayment)}
                onChange={(e) => changeValue('otherPayment', e.target.value)}
                onKeyPress={(e) => keyPress(e)}
                pattern='\d*'
                placeholder='0'
              />
              <span>円</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)