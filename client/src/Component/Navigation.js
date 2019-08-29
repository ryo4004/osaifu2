import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Base from './Base/Base'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

const Navigation = () => {
  return (
    <Switch>
      <Route path='/' component={Base} />
    </Switch>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)