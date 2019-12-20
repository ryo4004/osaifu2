import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import Add from '../../../../Library/Icons/Add'

import { setModal } from '../../../../Actions/Actions/Payment'

import './Header.css'

const mapStateToProps = (state) => ({
  title: state.header.title,
  back: state.header.back,
  add: state.header.add
})

const mapDispatchToProps = (dispatch) => ({
  setModal: (modal) => dispatch(setModal(modal))
})

const Header = ({
  title, back, add,
  setModal
}) => {

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

  const showAdd = () => {
    if (!add) return
    return (
      <div className='label add'>
        <div onClick={() => setModal(true)}>
          <div className='add-icon'><Add /></div>
          {/* <span>追加</span> */}
        </div>
      </div>
    )
  }

  return (
    <div className='header'>
      {showBack()}
      <h2>{title}</h2>
      {showAdd()}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)