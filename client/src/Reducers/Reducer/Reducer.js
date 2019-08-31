import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loginReducer from '../Login'
import signupReducer from '../Signup'

export default (history) => combineReducers({
  login: loginReducer,
  signup: signupReducer,

  // The key must be router
  router: connectRouter(history)
})