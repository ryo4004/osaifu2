import React from 'react'
import ReactDOM from 'react-dom'
import { Plugins } from '@capacitor/core'

import App from './App'
import './reset.css'
import './index.css'

ReactDOM.render(
  <App />, document.getElementById('root')
)

const { SplashScreen } = Plugins
SplashScreen.hide()