import React from 'react'
import { connect } from 'react-redux'

import { setModal } from '../../../Actions/Actions/Tutorial'

import './Tutorial.css'

const mapStateToProps = (state) => ({
  modal: state.tutorial.modal
})

const mapDispatchToProps = (dispatch) => ({
  setModal: (modal) => dispatch(setModal(modal))
})

const Tutorial = ({
  modal,
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
              <h2>使いかた</h2>
              <p>このアプリでは普段のお支払いを記録することができます。</p>
              <p>支払計がゼロになるよう日々のお支払いをすることでふたりの負担がバランスよくなります。</p>
              <p>ホーム画面に追加していただくとお手軽にご利用できます。</p>
              <p><a href='https://osaifu.zatsuzen.com/guide' target='_blank' rel="noopener noreferrer">詳しくはこちら</a></p>
              <button onClick={() => setModal(false)}>はじめる</button>
            </div>
          </div>
        </div>
      </div>
      <div className={'modal-background' + modalClass}></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial)