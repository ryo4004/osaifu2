import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import sessionReducer from '../Session'
import statusReducer from '../Status'
import toastReducer from '../Toast'

import loginReducer from '../Login'
import signupReducer from '../Signup'

import headerReducer from '../Header'
import addReducer from '../Add'
import paymentReducer from '../Payment'
import listReducer from '../List'
import detailReducer from '../Detail'
import settingReducer from '../Setting'

export default (history) => combineReducers({
  session: sessionReducer,
  status: statusReducer,
  toast: toastReducer,

  login: loginReducer,
  signup: signupReducer,

  header: headerReducer,
  add: addReducer,
  payment: paymentReducer,
  list: listReducer,
  detail: detailReducer,
  setting: settingReducer,

  // The key must be router
  router: connectRouter(history)
})