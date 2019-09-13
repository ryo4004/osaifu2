import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Payment'
import { post } from '../Library/Request'

import { loading, setPayment, setPaymentCheck, setSelfPayment, setOtherPayment, setMemo, setError } from '../Actions/Actions/Payment'
import { showToast } from '../Actions/Actions/Toast'

import * as lib from '../Library/Library'

function* runRequest () {
  const state = yield select()
  const date = state.payment.date.split('-')
  const payment = {
    payment: state.payment.payment,
    selfPayment: state.payment.selfPayment,
    otherPayment: state.payment.otherPayment,
    memo: state.payment.memo,
    useDate: state.payment.useDate,
    paymentDate: (new Date(date[0], date[1] - 1, date[2]).getTime()),
    sendDate: (new Date().getTime()),
  }
  if (!state.payment.payment) return yield put(setError({type: 'blankPayment'}))
  yield put(loading(true))
  const send = {  
    session: lib.getSession(),
    payment
  }
  console.log(send)
  const res = yield call(() => post('/payment', send))
  yield put(loading(false))
  console.warn(res)
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    console.log({payment})
    yield put(showToast(payment.payment + '円 記録しました'))
    yield put(setPayment(''))
    yield put(setPaymentCheck(false))
    yield put(setSelfPayment(''))
    yield put(setOtherPayment(''))
    yield put(setMemo(''))
  }
}

export default function* watchRequestSession () {
  yield takeLatest(ActionType.PAYMENT_SEND_PAYMENT, runRequest)
}