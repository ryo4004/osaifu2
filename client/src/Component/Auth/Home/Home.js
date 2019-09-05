import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setTitle } from '../../../Actions/Actions/Header'

import './Home.css'

const mapStateToProps = (state) => ({
  addModal: state.add.modal
})

const mapDispatchToProps = (dispatch) => ({
  setTitle: (title) => dispatch(setTitle(title))
})

const Home = ({
  addModal,
  setTitle
}) => {

  useEffect(() => {
    setTitle('支払い')
  }, [])

  const modal = addModal ? ' modal-open' : ''

  return (
    <div className='home contents'>
      <div className={'contents-inner' + modal}>
        <h2>Home</h2>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)