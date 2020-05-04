import {
  createStore as reduxCreateStore,
  compose,
  applyMiddleware
} from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
// import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import createReducer from '../Reducers/Reducer/Reducer'

export const history = createBrowserHistory()
export const sagaMiddleware = createSagaMiddleware()

export default function createStore () {
  return reduxCreateStore(
    createReducer(history),
    compose(
      applyMiddleware(
        // logger,
        sagaMiddleware,
        routerMiddleware(history)
      )
    )
  )
}
