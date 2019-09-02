import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionType from '../Actions/Constants/Signup'
import { post } from '../Library/Request'

import { loading, setError } from '../Actions/Actions/Signup'

import * as lib from '../Library/Library'

function* runRequestSignup () {
  const state = yield select()
  if (!state.signup.userid || !state.signup.password) yield put(setError({type: 'blankTextbox'}))
  yield put(loading(true))
  yield put(setError(false))
  const send = {
    userid: state.signup.userid,
    password: state.signup.password,
    clientid: lib.getClientid(),
    userAgent: window.navigator.userAgent,
    version: lib.version
  }
  const res = yield call(() => post('/signup', send))
  yield put(loading(false))
  console.log('response', res)
  if (!res.body.status) return yield put(setError(res.body.err))
}

export default function* watchRequestSignup () {
  yield takeLatest(ActionType.SIGNUP_REQUEST_SIGNUP_REQUEST, runRequestSignup)
}