import { call, put, takeLatest } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Status'
import { post } from '../Library/Request'

import { loading, setStatus, setError } from '../Actions/Actions/Status'

import * as lib from '../Library/Library'

function* runRequestStatus () {
  yield put(loading(true))
  const send = {session: lib.getSession()}
  const res = yield call(() => post('/status', send))
  yield put(loading(false))
  if (!res.body.status) return yield put(setStatus(res.body.dbStatus))
  yield put(setStatus(null))
  yield put(setError(res.body.err))
}

export default function* watchRequestSession () {
  yield takeLatest(ActionType.STATUS_REQUEST_STATUS, runRequestStatus)
}