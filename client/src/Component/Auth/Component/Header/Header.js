import React from 'react'
import { connect } from 'react-redux'

import './Header.css'

const mapStateToProps = (state) => ({
  title: state.header.title
})

const mapDispatchToProps = (dispatch) => ({})

const Home = ({ title }) => {

  return (
    <div className='header'>
      <h2>{title}</h2>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)