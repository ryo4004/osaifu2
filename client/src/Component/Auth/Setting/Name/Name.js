import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setTitle } from '../../../../Actions/Actions/Header'

import './Name.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  setTitle: (title) => dispatch(setTitle(title))
})

const Name = ({
  setTitle
}) => {

  useEffect(() => {
    setTitle('名前の変更')
  }, [])

  return (
    <div className='setting-name'>
      <h2>Setting name</h2>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Name)