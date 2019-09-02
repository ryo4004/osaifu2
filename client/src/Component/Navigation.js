import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Base from './Base/Base'
import Auth from './Auth/Auth'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

const Navigation = () => {
  return (
    <Switch>
      <Route path='/login' component={Base} />
      <Route path='/signup' component={Base} />
      <Route path='/' component={Auth} />
    </Switch>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)