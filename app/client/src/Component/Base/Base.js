import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login/Login'
import Signup from './Signup/Signup'

import Logo from '../../Library/Logo/Logo'


import './Base.css'

const mapStateToProps = (state) => ({
  location: state.router.location
})

const mapDispatchToProps = () => ({})

const Base = () => {

  const link = location.pathname.match(/signup/i) ? <Link to='/login' className='button'>ログイン</Link> : <Link to='/signup' className='button'>アカウント作成</Link>

  return (
    <div className='base'>
      <div className='header-base'>
        <header>
          <div className='contents'>
            <div className='title'>
              <a href='https://osaifu.zatsuzen.com'>
                <div className='icon'><Logo /></div><h1>おさいふ</h1>
              </a>
            </div>
            <div className='menu'>
              <a href='https://osaifu.zatsuzen.com'>ホーム</a>
              {/* <a href='https://osaifu.zatsuzen.com/feature'>特徴</a> */}
              <a href='https://osaifu.zatsuzen.com/guide'>ご利用方法</a>
              {link}
            </div>
          </div>
        </header>
      </div>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)