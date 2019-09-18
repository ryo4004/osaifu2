import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Back from '../../../Icons/Back'

import './Header.css'

const mapStateToProps = (state) => ({
  title: state.header.title,
  back: state.header.back
})

const mapDispatchToProps = (dispatch) => ({})

const Header = ({ title, back }) => {

  const showBack = () => {
    if (!back) return
    return (
      <div className='label back'>
        <Link to={back}>
          <div className='back-icon'><Back /></div>
          <span>戻る</span>
        </Link>
      </div>
    )
  }

  return (
    <div className='header'>
      {showBack()}
      <h2>{title}</h2>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)