import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import * as ActionType from '../Actions/Constants/Login'
import { post } from '../Library/Request'

import { loading, changeUserid, changePassword, setError } from '../Actions/Actions/Login'
import { setUser } from '../Actions/Actions/Session'

import * as lib from '../Library/Library'

function* runRequestLogin () {
  const state = yield select()
  if (!state.login.userid || !state.login.password) return yield put(setError({type: 'blankTextbox'}))
  yield put(loading(true))
  yield put(setError(false))
  const send = {
    userid: state.login.userid,
    password: state.login.password,
    clientid: lib.getClientid(),
    userAgent: window.navigator.userAgent,
    version: lib.version
  }
  const res = yield call(() => post('/login', send))
  yield put(loading(false))
  yield put(changePassword(''))
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    yield put(setError(false))
    yield put(changeUserid(''))
    yield put(setUser(res.body.user))
    yield call(() => lib.updateToken(res.body.token))
    yield call(() => lib.updateUserid(res.body.user.userid))
    yield put(replace('/list'))  
  }
}

export default function* watchRequestLogin () {
  yield takeLatest(ActionType.LOGIN_REQUEST_LOGIN_REQUEST, runRequestLogin)
}