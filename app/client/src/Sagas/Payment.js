import { call, put, takeLatest, select } from 'redux-saga/effects'

import * as ActionType from '../Actions/Constants/Payment'
import { post } from '../Library/Request'

import { loading, setModal, setUseDate, setDate, setPayment, setPaymentCheck, setSelfPayment, setOtherPayment, setMemo, setError } from '../Actions/Actions/Payment'
import { requestList } from '../Actions/Actions/List'
import { showToast } from '../Actions/Actions/Toast'

import * as lib from '../Library/Library'

function* runRequest () {
  const state = yield select()
  if (!state.payment.payment) return yield put(setError({type: 'blankPayment'}))
  if (state.payment.loading) return false
  yield put(loading(true))
  const date = state.payment.date.split('-')
  const payment = {
    payment: state.payment.payment,
    hostPayment: state.status.status.type === 'solo' ? state.payment.selfPayment : (state.status.status.host === state.session.user.userKey ? state.payment.selfPayment : state.payment.otherPayment),
    clientPayment: state.status.status.type === 'solo' ? state.payment.otherPayment : (state.status.status.host === state.session.user.userKey ? state.payment.otherPayment : state.payment.selfPayment),
    memo: state.payment.memo,
    useDate: state.payment.useDate,
    paymentDate: (new Date(date[0], date[1] - 1, date[2]).getTime()),
    sendDate: (new Date().getTime()),
  }
  const send = {  
    session: lib.getSession(),
    payment
  }
  const res = yield call(() => post('/payment', send))
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    yield put(setModal(false))
    yield put(showToast(state.status.status.name + 'に ' + payment.payment + '円 記録しました'))
    yield put(requestList())
    yield call(() => resetPayment())
  }
  yield put(loading(false))
}

function* runModalToggle (action) {
  if (action.payload.modal) {
    yield call(() => resetPayment())
  }
}

function* resetPayment () {
  const time = new Date()
  yield put(setDate(time.getFullYear() + '-' + ('00' + (time.getMonth() + 1)).slice(-2) + '-' + ('00' + time.getDate()).slice(-2)))
  yield put(setUseDate(false))
  yield put(setPayment(''))
  yield put(setPaymentCheck(false))
  yield put(setSelfPayment(''))
  yield put(setOtherPayment(''))
  yield put(setMemo(''))
  yield put(setError(false))
}

export default function* watchRequestSession () {
  yield takeLatest(ActionType.PAYMENT_SEND_PAYMENT, runRequest)
  yield takeLatest(ActionType.PAYMENT_SET_MODAL, runModalToggle)
}