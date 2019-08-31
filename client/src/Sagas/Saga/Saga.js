import { all, fork } from 'redux-saga/effects'

import Login from '../Login'
import Signup from '../Signup'

export default function* rootSaga () {
  yield all([
    fork(Login),
    fork(Signup)
  ])
}