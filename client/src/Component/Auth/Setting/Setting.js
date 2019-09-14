import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Home/Home'
import Name from './Name/Name'

import './Setting.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

const Setting = ({}) => {

  return (
    <div className='setting contents'>
      <div className='contents-inner'>
        <Switch>
          <Route path='/setting' exact component={Home} />
          <Route path='/setting/name' component={Name} />
        </Switch>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)