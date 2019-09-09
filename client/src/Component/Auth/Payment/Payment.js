import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setTitle } from '../../../Actions/Actions/Header'

import './Payment.css'

const mapStateToProps = (state) => ({
  addModal: state.add.modal
})

const mapDispatchToProps = (dispatch) => ({
  setTitle: (title) => dispatch(setTitle(title))
})

const Payment = ({
  addModal,
  setTitle
}) => {

  useEffect(() => {
    setTitle('支払い')
  }, [])

  const modal = addModal ? ' modal-open' : ''

  return (
    <div className='payment contents'>
      <div className={'contents-inner' + modal}>
        <h2>Payment</h2>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)