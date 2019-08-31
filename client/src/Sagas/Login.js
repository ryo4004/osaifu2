import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionType from '../Actions/Constants/Login'
import { post } from '../Library/Request'

import { requestLogin, setError } from '../Actions/Actions/Login'

function* runRequestLogin () {
  const state = yield select()
  console.log(select(), yield select())
  if (!state.login.userid || !state.login.password) yield put(setError({type: 'blankTextbox'}))
  const send = {
    userid: state.login.userid,
    password: state.login.password
  }
  const result = yield call(() => post('/login', send))
  yield put(requestLogin.result(result))
}

export default function* watchRequestLogin () {
  yield takeLatest(ActionType.LOGIN_REQUEST_LOGIN_REQUEST, runRequestLogin)
}