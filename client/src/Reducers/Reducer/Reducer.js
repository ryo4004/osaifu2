import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loginReducer from '../Login'
import signupReducer from '../Signup'

import sessionReducer from '../Session'
import statusReducer from '../Status'
import headerReducer from '../Header'
import addReducer from '../Add'
import paymentReducer from '../Payment'
import listReducer from '../List'

export default (history) => combineReducers({
  login: loginReducer,
  signup: signupReducer,
  session: sessionReducer,
  status: statusReducer,
  header: headerReducer,
  add: addReducer,
  payment: paymentReducer,
  list: listReducer,

  // The key must be router
  router: connectRouter(history)
})