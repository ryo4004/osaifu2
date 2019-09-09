import { all, fork } from 'redux-saga/effects'

import Login from '../Login'
import Signup from '../Signup'
import Session from '../Session'
import Status from '../Status'
import Add from '../Add'

export default function* rootSaga () {
  yield all([
    fork(Login),
    fork(Signup),
    fork(Session),
    fork(Status),
    fork(Add)
  ])
}