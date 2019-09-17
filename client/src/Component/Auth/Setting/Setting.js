import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Home/Home'
import Username from './Username/Username'
import Othername from './Othername/Othername'
import Password from './Password/Password'

import './Setting.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

const Setting = ({}) => {

  return (
    <div className='setting contents'>
      <div className='contents-inner'>
        <Switch>
          <Route path='/setting' exact component={Home} />
          <Route path='/setting/username' component={Username} />
          <Route path='/setting/othername' component={Othername} />
          <Route path='/setting/password' component={Password} />
        </Switch>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)