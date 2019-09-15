import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import * as ActionType from '../Actions/Constants/Setting'
import { post } from '../Library/Request'

import { loading, setError } from '../Actions/Actions/Setting'
import { setUser } from '../Actions/Actions/Session'

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

export default function* watchRequestLogin () {
  yield takeLatest(ActionType.SETTING_REQUEST_CHANGE_USERNAME, runRequestChangeUsername)
}