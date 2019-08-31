import { all, call, fork, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionType from '../Actions/Constants/Login'
import { post } from '../Library/Request'

import { requestLogin } from '../Actions/Actions/Login'

function* runRequestLogin (action) {
  const state = yield select()
  const result = yield call(() => post('/login', {}), action.payload)
}

export function* watchRequestLogin () {
  yield takeLatest(ActionType.LOGIN_REQUEST_LOGIN_REQUEST, runRequestLogin)
}

export default function* rootSaga () {
  yield all([fork(watchRequestLogin)])
}