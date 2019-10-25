import { all, fork } from 'redux-saga/effects'

import Login from '../Login'
import Signup from '../Signup'
import Session from '../Session'
import Status from '../Status'
import Payment from '../Payment'
import List from '../List'
import Detail from '../Detail'
import Toast from '../Toast'
import Setting from '../Setting'

export default function* rootSaga () {
  yield all([
    fork(Login),
    fork(Signup),
    fork(Session),
    fork(Status),
    fork(Payment),
    fork(List),
    fork(Detail),
    fork(Toast),
    fork(Setting)
  ])
}