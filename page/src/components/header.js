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
      <div className='menu'>
        <Link to='/#features'>特徴</Link>
        <Link to='/guide'>ご利用方法</Link>
        <Link to='/terms'>利用規約</Link>
        <a href='https://app.osaifu.zatsuzen.com' className='button'>はじめる</a>
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
