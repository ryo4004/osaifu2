import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestAuth } from '../../Actions/Actions/Session'

import Home from './Home/Home'

import './Auth.css'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  requestAuth: () => dispatch(requestAuth())
})

const Auth = ({
  requestAuth
}) => {

  useEffect(() => {
    requestAuth()
  }, [])

  return (
    <div className='auth'>
      <Switch>
        <Route path='/home' component={Home} />
      </Switch>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)