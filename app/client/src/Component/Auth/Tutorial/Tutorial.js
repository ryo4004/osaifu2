import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setModal } from '../../../Actions/Actions/Tutorial'

import './Tutorial.css'

const mapStateToProps = (state) => ({
  modal: state.tutorial.modal,

  user: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
  setModal: (modal) => dispatch(setModal(modal))
})

const Tutorial = ({
  modal, user,
  setModal
}) => {

  const modalClass = modal ? ' open' : ' close'
  return (
    <div className='tutorial'>
      <div className={'modal-contents' + modalClass}>
        <header><h2>ようこそ</h2></header>
        <div className='contents'>
          <div className='contents-inner-modal'>
            <div className='text'>
              <p>登録ありがとうございます</p>
              <button onClick={() => setModal(false)}>開始</button>
            </div>
          </div>
        </div>
      </div>
      <div className={'modal-background' + modalClass}></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial)