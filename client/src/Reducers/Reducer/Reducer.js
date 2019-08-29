import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loginReducer from '../Login'

export default (history) => combineReducers({
  login: loginReducer,

  // The key must be router
  router: connectRouter(history)
})