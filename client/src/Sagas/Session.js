import { call, put, takeLatest } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import * as ActionType from '../Actions/Constants/Session'
import { post } from '../Library/Request'

import { loading, setUser, setError } from '../Actions/Actions/Session'

import * as lib from '../Library/Library'

function* runRequestSession () {
  yield put(loading(true))
  const send = {session: lib.getSession()}
  const res = yield call(() => post('/auth', send))
  yield put(loading(false))
  if (!res.body.status) {
    yield put(setUser(null))
    yield put(setError(res.body.err))
    return replace('/login')
  }
  yield put(setUser(res.body.user))
}

export default function* watchRequestSession () {
  yield takeLatest(ActionType.SESSION_REQUEST_AUTH, runRequestSession)
}