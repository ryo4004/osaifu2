import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestAuth } from '../../Actions/Actions/Session'

import Home from './Home/Home'
import List from './List/List'
import Setting from './Setting/Setting'

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
        <Route path='/list' component={List} />
        <Route path='/setting' component={Setting} />
      </Switch>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)