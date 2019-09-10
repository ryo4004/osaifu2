import React from 'react'
import { Route, Link } from 'react-router-dom'

import './Navigation.css'

export default function Navigation () {

  return (
    <div className='navigation'>
      <ul>
        <li><CustomLink to='/payment' label='支払い' icon='fas fa-coins' /></li>
        <li><CustomLink to='/list' label='履歴' icon='fas fa-bars' /></li>
        <li><CustomLink to='/setting' label='設定' icon='fas fa-cog' /></li>
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