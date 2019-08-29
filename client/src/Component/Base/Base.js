import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login/Login'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

const Base = () => {
  return (
    <Switch>
      <Route path='/login' component={Login} />
    </Switch>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)