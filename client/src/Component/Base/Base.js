import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login/Login'
import Signup from './Signup/Signup'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

const Base = () => {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </Switch>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)