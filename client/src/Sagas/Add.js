import { call, put, takeLatest, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import * as ActionType from '../Actions/Constants/Add'
import { post } from '../Library/Request'

import { loading, setModal, setError } from '../Actions/Actions/Add'
import { setStatus } from '../Actions/Actions/Status'

import * as lib from '../Library/Library'

function* runRequest () {
  const state = yield select()
  if (!state.add.name) return yield put(setError({type: 'blankName'}))
  yield put(loading(true))
  yield put(setError(false))
  const send = {
    session: lib.getSession(),
    name: state.add.name
  }
  const res = yield call(() => post('/adddb', send))
  console.log('add', res)
  yield put(loading(false))
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    yield put(setModal(false))
    yield put(setStatus(res.body.status))
  }
}

export default function* watchRequestLogin () {
  yield takeLatest(ActionType.ADD_REQUEST_CREATE_OSAIFU, runRequest)
}