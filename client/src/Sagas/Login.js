import { all, call, fork, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionType from '../Actions/Constants/Login'
import { post } from '../Library/Request'

import { requestLogin, setError } from '../Actions/Actions/Login'

function* runRequestLogin (action) {
  const state = yield select()
  if (!state.login.userid || !state.login.password) yield put(setError({type: 'blankTextbox'}))
  const send = {
    userid: state.login.userid,
    password: state.login.password
  }
  const result = yield call(() => post('/login', send), action.payload)
  yield put(requestLogin.result(result))
}

export function* watchRequestLogin () {
  yield takeLatest(ActionType.LOGIN_REQUEST_LOGIN_REQUEST, runRequestLogin)
}

export default function* rootSaga () {
  yield all([fork(watchRequestLogin)])
}