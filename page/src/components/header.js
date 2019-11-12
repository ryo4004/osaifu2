import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Image from '../images/component/osaifu-icon'

import './header.scss'

const Header = ({ siteTitle }) => (
  <header className='header'>
    <div className='contents'>
      <div className='title'>
        <div className='icon'>
          <Image className='img' />
        </div>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
      <div className='start'>
        <a href='https://app.osaifu.zatsuzen.com'>はじめる</a>
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
