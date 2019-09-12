import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { requestList } from '../../../Actions/Actions/List'
import { setTitle } from '../../../Actions/Actions/Header'

import './List.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  requestList: () => dispatch(requestList()),
  setTitle: (title) => dispatch(setTitle(title))
})

const List = ({
  requestList, setTitle
}) => {

  useEffect(() => {
    setTitle('履歴')
    requestList()
  }, [])

  return (
    <div className='list contents'>
      <h2>List</h2>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(List)