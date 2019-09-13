import React from 'react'
import { connect } from 'react-redux'

import { setModal, requestDelete } from '../../../Actions/Actions/Detail'

import * as lib from '../../../Library/Library'

import './Detail.css'

const mapStateToProps = (state) => ({
  modal: state.detail.modal,
  content: state.detail.content,
  err: state.detail.err,

  user: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
  setModal: (modal) => dispatch(setModal(modal)),
  requestDelete: (id) => dispatch(requestDelete(id))
})

const Detail = ({
  modal, content, err,
  setModal, requestDelete
}) => {

  const showContent = () => {
    if (!content) return false
    return (
      <div>
        <div className='payment'>{lib.addSeparator(content.payment)}<span>円</span></div>
        <div className='self-payment'>{lib.addSeparator(content.selfPayment)}<span>円</span></div>
        <div className='other-payment'>{lib.addSeparator(content.otherPayment)}<span>円</span></div>
        <div>{content.createdAt}</div>
        <div>{lib.unixDateTime(content.paymentDate)}</div>
        <button onClick={() => requestDelete(content._id)}>削除</button>
      </div>
    )
  }

  const modalClass = modal ? ' open' : ' close'

  return (
    <div className='detail'>
      <div className={'modal-contents' + modalClass}>
        <div className='detail-content'>
          <div className='modal-header'>
            <h2>詳細</h2>
            <div className='close' onClick={() => setModal(false)}>&times;</div>
          </div>
          <div className='modal-content'>
            {showContent()}
          </div>
        </div>
      </div>
      <div className={'modal-background' + modalClass} onClick={() => setModal(false)}></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)