import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeName, requestCreateOsaifu } from '../../../Actions/Actions/Add'

import './Add.css'

const mapStateToProps = (state) => ({
  modal: state.add.modal,
  name: state.add.name,
  err: state.add.err
})

const mapDispatchToProps = (dispatch) => ({
  changeName: (name) => dispatch(changeName(name)),
  requestCreateOsaifu: () => dispatch(requestCreateOsaifu())
})

const Home = ({
  modal, name, err,
  changeName, requestCreateOsaifu
}) => {

  const modalClass = modal ? ' open' : ' close'
  return (
    <div className='add'>
      <div className={'modal-contents' + modalClass}>
        <header><h2>新しいおさいふの作成</h2></header>
        <div className='contents'>
          <div className='contents-inner-modal'>
            <input type='text' value={name} onChange={(e) => changeName(e.target.value)} placeholder='おさいふの名前' />
            <button onClick={() => requestCreateOsaifu()}>設定</button>
          </div>
        </div>
      </div>
      <div className={'modal-background' + modalClass}></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)