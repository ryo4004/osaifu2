import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Payment'
import { post } from '../Library/Request'

import { loading, setPayment, setPaymentCheck, setSelfPayment, setOtherPayment, setError } from '../Actions/Actions/Payment'

import * as lib from '../Library/Library'

function* runRequest () {
  const state = yield select()
  if (!state.payment.payment) return yield put(setError({type: 'blankPayment'}))
  yield put(loading(true))
  const send = {
    session: lib.getSession(),
    payment: state.payment
  }
  const res = yield call(() => post('/payment', send))
  yield put(loading(false))
  console.warn(res)
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    yield put(setPayment(''))
    yield put(setPaymentCheck(false))
    yield put(setSelfPayment(''))
    yield put(setOtherPayment(''))
  }
}

export default function* watchRequestSession () {
  yield takeLatest(ActionType.PAYMENT_SEND_PAYMENT, runRequest)
}