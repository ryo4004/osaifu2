import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loginReducer from '../Login'
import signupReducer from '../Signup'

import sessionReducer from '../Session'
import headerReducer from '../Header'

export default (history) => combineReducers({
  login: loginReducer,
  signup: signupReducer,
  session: sessionReducer,
  header: headerReducer,

  // The key must be router
  router: connectRouter(history)
})