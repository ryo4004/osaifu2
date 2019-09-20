import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import * as ActionType from '../Actions/Constants/Setting'
import { post } from '../Library/Request'

import { loading, setConnectPass, setError } from '../Actions/Actions/Setting'
import { setUser } from '../Actions/Actions/Session'

import { setStatus } from '../Actions/Actions/Status'
import * as lib from '../Library/Library'

function* runRequestChangeUsername () {
  const state = yield select()
  if (!state.setting.username) return yield put(setError({type: 'blankTextbox'}))
  yield put(loading(true))
  yield put(setError(false))
  const send = {
    session: lib.getSession(),
    username: state.setting.username
  }
  const res = yield call(() => post('/setting/username', send))
  yield put(loading(false))
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    yield put(setUser(res.body.user))
    yield put(replace('/setting'))
  }
}

function* runRequestChangeOthername () {
  const state = yield select()
  if (!state.setting.othername) return yield put(setError({type: 'blankTextbox'}))
  yield put(loading(true))
  yield put(setError(false))
  const send = {
    session: lib.getSession(),
    othername: state.setting.othername
  }
  const res = yield call(() => post('/setting/othername', send))
  yield put(loading(false))
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    yield put(setUser(res.body.user))
    yield put(replace('/setting'))
  }
}

function* runRequestChangePassword () {
  const state = yield select()
  if (!state.setting.oldPassword || !state.setting.newPassword) return yield put(setError({type: 'blankTextbox'}))
  yield put(loading(true))
  yield put(setError(false))
  const send = {
    session: lib.getSession(),
    oldPassword: state.setting.oldPassword,
    newPassword: state.setting.newPassword
  }
  const res = yield call(() => post('/setting/password', send))
  yield put(loading(false))
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    yield put(setUser(res.body.user))
    yield put(replace('/setting'))
  }
}

function* runRequestChangeOsaifuname () {
  const state = yield select()
  if (!state.setting.osaifuname) return yield put(setError({type: 'blankTextbox'}))
  yield put(loading(true))
  yield put(setError(false))
  const send = {
    session: lib.getSession(),
    osaifuname: state.setting.osaifuname
  }
  const res = yield call(() => post('/setting/osaifuname', send))
  yield put(loading(false))
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    yield put(setStatus(res.body.status))
    yield put(replace('/setting'))
  }
}

function* runRequestConnectPass () {
  const state = yield select()
  yield put(loading(true))
  yield put(setError(false))
  const send = {
    session: lib.getSession(),
    oldPass: state.setting.connectPass
  }
  const res = yield call(() => post('/setting/connect', send))
  yield put(loading(false))
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    yield put(setConnectPass(res.body.pass))
  }
}

export default function* watchRequestLogin () {
  yield takeLatest(ActionType.SETTING_REQUEST_CHANGE_USERNAME, runRequestChangeUsername)
  yield takeLatest(ActionType.SETTING_REQUEST_CHANGE_OTHERNAME, runRequestChangeOthername)
  yield takeLatest(ActionType.SETTING_REQUEST_CHANGE_PASSWORD, runRequestChangePassword)
  yield takeLatest(ActionType.SETTING_REQUEST_CHANGE_OSAIFUNAME, runRequestChangeOsaifuname)
  yield takeLatest(ActionType.SETTING_REQUEST_CONNECT_PASS, runRequestConnectPass)
}