import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login/Login'
import Signup from './Signup/Signup'

import Logo from '../../Library/Logo/Logo'


import './Base.css'

const mapStateToProps = (state) => ({
  location: state.router.location
})

const mapDispatchToProps = () => ({})

const Base = () => {
  return (
    <div className='base'>
      <header>
        <a href='https://osaifu.zatsuzen.com'>
          <div className='icon'><Logo /></div><h1>おさいふ</h1>
        </a>
      </header>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)