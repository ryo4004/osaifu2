import React from 'react'
import { connect } from 'react-redux'

import './Home.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

const Home = ({}) => {

  return (
    <div className='home'>
      <h2>Home</h2>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)