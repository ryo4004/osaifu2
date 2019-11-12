import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Image from '../images/component/osaifu-icon'

import './header.scss'

const Header = ({ siteTitle }) => (
  <header className='header'>
    <div className='frame'>
      <div className='title'>
        <div className='icon'>
          <Image className='img' />
        </div>
        <h1 style={{ margin: 0 }}>
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
