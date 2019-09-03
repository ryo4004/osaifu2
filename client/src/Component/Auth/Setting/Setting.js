import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setTitle } from '../../../Actions/Actions/Header'

import './Setting.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  setTitle: (title) => dispatch(setTitle(title))
})

const Setting = ({
  setTitle
}) => {

  useEffect(() => {
    setTitle('設定')
  }, [])

  return (
    <div className='setting contents'>
      <h2>Setting</h2>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)