import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setTitle } from '../../../Actions/Actions/Header'

import './Home.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  setTitle: (title) => dispatch(setTitle(title))
})

const Home = ({
  setTitle
}) => {

  useEffect(() => {
    setTitle('支払い')
  }, [])

  return (
    <div className='home contents'>
      <h2>Home</h2>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)