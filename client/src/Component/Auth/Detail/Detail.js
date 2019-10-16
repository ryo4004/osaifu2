import React from 'react'
import { connect } from 'react-redux'

import { setModal, requestDelete } from '../../../Actions/Actions/Detail'

import * as lib from '../../../Library/Library'

import './Detail.css'

const mapStateToProps = (state) => ({
  modal: state.detail.modal,
  content: state.detail.content,
  err: state.detail.err,

  user: state.session.user,
  status: state.status.status
})

const mapDispatchToProps = (dispatch) => ({
  setModal: (modal) => dispatch(setModal(modal)),
  requestDelete: (id) => dispatch(requestDelete(id))
})

const Detail = ({
  modal, content, err, user, status,
  setModal, requestDelete
}) => {

  const showContent = () => {
    if (!content) return false
    const date = content.useDate === 'true' ? lib.unixDateTime(content.paymentDate) : lib.unixDateTime(content.sendDate)
    const day = date.split('T')[0]
    const time = content.useDate === 'true' ? false : <span className='time'>{date.split('T')[1].split(':')[0] + ':' + date.split('T')[1].split(':')[1]}</span>
    const memo = content.memo ? <div className='memo'><label>メモ</label><div>{content.memo}</div></div> : false
    const selfName = user ? user.username : ''
    const otherName = status ? status.othername : ''
    const selfType = status.type === 'solo' ? 'hostPayment' : (status.host === user.userKey ? 'hostPayment' : 'clientPayment')
    const otherType = status.type === 'solo' ? 'clientPayment' : (status.host === user.userKey ? 'clientPayment' : 'hostPayment')
    return (
      <div>
        <div className='date'><div><span>{day.replace(/-/g, '/')}</span>{time}</div></div>
        <div className='payment'><label>支払額</label><div>{lib.addSeparator(Number(content.payment))}<span>円</span></div></div>
        {memo}
        <div className='each-payment'>
          <label>支払分担</label>
          <div>
            <div className='self-payment'><label>{selfName}</label><div>{lib.addSeparator(Number(content[selfType]))}<span>円</span></div></div>
            <div className='other-payment'><label>{otherName}</label><div>{lib.addSeparator(Number(content[otherType]))}<span>円</span></div></div>
          </div>
        </div>
        <div className='debug'>
          <div>{content.createdAt}</div>
          <div>{lib.unixDateTime(content.paymentDate)}</div>
        </div>
        <div className='button'>
          <button onClick={() => requestDelete(content._id)}>削除</button>
        </div>
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