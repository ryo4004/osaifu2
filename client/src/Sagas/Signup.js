import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionType from '../Actions/Constants/Signup'
import { post } from '../Library/Request'

import { requestSignup, setError } from '../Actions/Actions/Signup'

function* runRequestSignup () {
  const state = yield select()
  if (!state.signup.userid || !state.signup.password) yield put(setError({type: 'blankTextbox'}))
  const send = {
    userid: state.signup.userid,
    password: state.signup.password
  }
  const result = yield call(() => post('/signup', send))
}

export default function* watchRequestSignup () {
  yield takeLatest(ActionType.SIGNUP_REQUEST_SIGNUP_REQUEST, runRequestSignup)
}