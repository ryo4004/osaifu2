import { call, put, takeLatest } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/List'
import { post } from '../Library/Request'

import { loading, setList, setCalcList, setSummary, setError } from '../Actions/Actions/List'

import * as lib from '../Library/Library'

function* runRequestList () {
  yield put(loading(true))
  const send = {session: lib.getSession()}
  const res = yield call(() => post('/list', send))
  if (res.body.err) {
    yield put(setList(null))
    yield put(setError(res.body.err))
    yield put(replace('/login'))
  } else {
    yield put(setList(res.body.list))
    let calcList = new Map()
    for (let i = 0; i < res.body.list.length; i++) {
      const each = res.body.list[i]
      const date = (each.useDate ? lib.unixDate(each.paymentDate) : each.createdAt).split('T')[0]
      const newArray = Array.isArray(calcList.get(date)) ? calcList.get(date).concat(each) : [each]
      calcList.set(date, newArray)
    }
    let paymentSum = 0, hostSum = 0, clientSum = 0
    res.body.list.forEach((each) => {
      paymentSum += parseInt(each.payment)
      hostSum += parseInt(each.hostPayment)
      clientSum += parseInt(each.clientPayment)
    })
    yield put(setCalcList(calcList))
    yield put(setSummary({payment: paymentSum, host: hostSum, client: clientSum}))
  }
  yield put(loading(false))
}

export default function* watchRequestList () {
  yield takeLatest(ActionType.LIST_REQUEST_LIST, runRequestList)
}