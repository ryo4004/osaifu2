import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestAuth } from '../../Actions/Actions/Session'
import { requestStatus } from '../../Actions/Actions/Status'

import Payment from './Payment/Payment'
import List from './List/List'
import Setting from './Setting/Setting'
import Header from './Component/Header/Header'
import Navigation from './Component/Navigation/Navigation'

import Detail from './Detail/Detail'
import Tutorial from './Tutorial/Tutorial'

import './Auth.css'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  requestAuth: () => dispatch(requestAuth()),
  requestStatus: () => dispatch(requestStatus())
})

const Auth = ({
  requestAuth, requestStatus
}) => {

  useEffect(() => {
    requestAuth()
    requestStatus()
  }, [])

  return (
    <React.Fragment>
      <div className='auth'>
        <Header />
        <Switch>
          <Route path='/list' component={List} />
          <Route path='/setting' component={Setting} />
        </Switch>
      </div>
      <Navigation />
      <Payment />
      <Detail />
      <Tutorial />
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)