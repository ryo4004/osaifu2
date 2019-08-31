import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import createStore, { history, sagaMiddleware } from './Store/Store'

import Navigation from './Component/Navigation'

import rootSaga from './Sagas/Saga/Saga'

const store = createStore()

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' component={Navigation} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default App

sagaMiddleware.run(rootSaga)