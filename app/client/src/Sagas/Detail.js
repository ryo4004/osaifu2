import { call, put, takeLatest } from 'redux-saga/effects'

import * as ActionType from '../Actions/Constants/Detail'
import { post } from '../Library/Request'

import { loading, setModal, setContent, setError } from '../Actions/Actions/Detail'
import { requestList } from '../Actions/Actions/List'
import { showToast } from '../Actions/Actions/Toast'

import * as lib from '../Library/Library'

function* runRequestDelete (action) {
  yield put(loading(true))
  const send = {
    session: lib.getSession(),
    id: action.payload.id
  }
  const res = yield call(() => post('/delete', send))
  yield put(loading(false))
  if (res.body.err) {
    yield put(setError(res.body.err))
  } else {
    yield put(requestList())
    yield put(setModal(false))
    yield put(setContent(false))
    yield put(showToast('記録を削除しました'))
  }
}

export default function* watchRequestList () {
  yield takeLatest(ActionType.DETAIL_REQUEST_DELETE, runRequestDelete)
}