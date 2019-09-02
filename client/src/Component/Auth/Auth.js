import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Home/Home'

import './Auth.css'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

const Auth = () => {
  return (
    <div className='auth'>
      <Switch>
        <Route path='/home' component={Home} />
      </Switch>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)