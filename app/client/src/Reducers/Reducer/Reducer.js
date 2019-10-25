import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import sessionReducer from '../Session'
import statusReducer from '../Status'
import toastReducer from '../Toast'

import loginReducer from '../Login'
import signupReducer from '../Signup'

import headerReducer from '../Header'
import paymentReducer from '../Payment'
import listReducer from '../List'
import detailReducer from '../Detail'
import settingReducer from '../Setting'
import tutorialReducer from '../Tutorial'

export default (history) => combineReducers({
  session: sessionReducer,
  status: statusReducer,
  toast: toastReducer,

  login: loginReducer,
  signup: signupReducer,

  header: headerReducer,
  payment: paymentReducer,
  list: listReducer,
  detail: detailReducer,
  setting: settingReducer,
  tutorial: tutorialReducer,

  // The key must be router
  router: connectRouter(history)
})