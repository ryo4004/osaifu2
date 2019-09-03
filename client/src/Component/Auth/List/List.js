import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setTitle } from '../../../Actions/Actions/Header'

import './List.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  setTitle: (title) => dispatch(setTitle(title))
})

const List = ({
  setTitle
}) => {

  useEffect(() => {
    setTitle('履歴')
  }, [])

  return (
    <div className='list contents'>
      <h2>List</h2>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(List)