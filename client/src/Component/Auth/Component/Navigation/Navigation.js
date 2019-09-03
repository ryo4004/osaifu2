import React from 'react'
import { Route, Link } from 'react-router-dom'

import './Navigation.css'

export default function Navigation () {

  return (
    <div className='navigation'>
      <ul>
        <li><CustomLink to='/home' label='支払い' icon='fas fa-yen-sign' /></li>
        <li><CustomLink to='/list' label='履歴' icon='fas fa-bars' /></li>
        <li><CustomLink to='/setting' label='設定' icon='fas fa-cog' /></li>
        {/* <li><Route><Link to='/home'><i className=''></i></Link></Route></li>
        <li><Route><Link to='/list'><i className='fas fa-bars'></i></Link></Route></li>
        <li><Route><Link to='/setting'><i className='fas fa-cog'></i></Link></Route></li> */}
      </ul>
    </div>
  )
}

const CustomLink = ({ label, to, icon }) => {
  return (
    <Route
      path={to}
      children={({ match }) => (
        <div className={match ? 'active' : ''}><Link to={to}><i className={icon}></i><span>{label}</span></Link></div>
      )}
    />
  )
}