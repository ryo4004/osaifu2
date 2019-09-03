import React from 'react'
import { connect } from 'react-redux'

import './List.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

const List = ({}) => {

  return (
    <div className='list'>
      <h2>List</h2>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(List)