import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './Add.css'

const mapStateToProps = (state) => ({
  modal: state.add.modal
})

const mapDispatchToProps = (dispatch) => ({})

const Home = ({
  modal
}) => {

  const modalClass = modal ? ' open' : ' close'
  return (
    <div className='add'>
      <div className={'modal-contents' + modalClass}>
        <header><h2>新しいおさいふの作成</h2></header>
      </div>
      <div className={'modal-background' + modalClass}></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)