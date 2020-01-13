import React from 'react'
import ReactDOM from 'react-dom'
import { Plugins, StatusBarStyle } from '@capacitor/core'

import App from './App'
import './reset.css'
import './index.css'

ReactDOM.render(
  <App />, document.getElementById('root')
)

const { SplashScreen, Keyboard, StatusBar } = Plugins
SplashScreen.hide()
Keyboard.setAccessoryBarVisible({isVisible: true})

StatusBar.setStyle({
  style: StatusBarStyle.Light
})