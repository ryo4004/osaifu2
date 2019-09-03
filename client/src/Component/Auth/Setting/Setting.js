import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Home/Home'

import './Setting.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

const Setting = ({}) => {

  return (
    <div className='setting contents'>
      <Switch>
        <Route path='/setting' component={Home} />
      </Switch>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)