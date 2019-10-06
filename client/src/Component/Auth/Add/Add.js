import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setMode, changeName, changePass, requestCreateOsaifu } from '../../../Actions/Actions/Add'

import './Add.css'

const mapStateToProps = (state) => ({
  modal: state.add.modal,
  mode: state.add.mode,
  name: state.add.name,
  pass: state.add.pass,
  err: state.add.err,

  user: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
  setMode: (mode) => dispatch(setMode(mode)),
  changeName: (name) => dispatch(changeName(name)),
  changePass: (pass) => dispatch(changePass(pass)),
  requestCreateOsaifu: () => dispatch(requestCreateOsaifu())
})

const Add = ({
  modal, mode, name, pass, err, user,
  setMode, changeName, changePass, requestCreateOsaifu
}) => {

  useEffect(() => {
    changeName(window.localStorage.userid ? window.localStorage.userid + ' のおさいふ' : 'おさいふ')
  }, [])

  // mode, true: name mode, false: pass mode

  const showForm = () => {
    if (mode) {
      return (
        <div>
          <label>おさいふの名前</label>
          <input type='text' value={name} onChange={(e) => changeName(e.target.value)} placeholder='おさいふの名前' />
        </div>
      )
    } else {
      return (
        <div>
          <label>共有パス</label>
          <input type='text' value={pass} onChange={(e) => changePass(e.target.value)} placeholder='共有パス' />
        </div>
      )
    }
  }

  const modalClass = modal ? ' open' : ' close'
  return (
    <div className='add'>
      <div className={'modal-contents' + modalClass}>
        <header><h2>新しいおさいふの作成</h2></header>
        <div className='contents'>
          <div className='contents-inner-modal'>
            <div onClick={() => setMode(false)}>共有する</div>
            <div onClick={() => setMode(true)}>新規作成</div>
            <div className='form'>
              {showForm()}
              <button onClick={() => requestCreateOsaifu()}>設定</button>
            </div>
          </div>
        </div>
      </div>
      <div className={'modal-background' + modalClass}></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)