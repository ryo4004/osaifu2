import { call, put, takeLatest } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/List'
import { post } from '../Library/Request'

import { loading, setList, setError } from '../Actions/Actions/List'

import * as lib from '../Library/Library'

function* runRequestList () {
  yield put(loading(true))
  const send = {session: lib.getSession()}
  const res = yield call(() => post('/list', send))
  yield put(loading(false))
  if (res.body.err) {
    yield put(setList(null))
    yield put(setError(res.body.err))
    yield put(replace('/login'))
  } else {
    yield put(setList(res.body.list))
  }
}

export default function* watchRequestList () {
  yield takeLatest(ActionType.LIST_REQUEST_LIST, runRequestList)
}