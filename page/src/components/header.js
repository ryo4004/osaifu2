import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Image from '../images/component/osaifu-icon'

import './header.scss'

const Header = ({ siteTitle, index }) => (
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
        {!index && <Link to='/'>ホーム</Link>}
        <Link to='/features'>特徴</Link>
        <Link to='/guide'>ご利用方法</Link>
        <a href='https://app.osaifu.zatsuzen.com' className='button'>はじめる</a>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  index: PropTypes.bool
}

Header.defaultProps = {
  siteTitle: ``,
  index: false
}

export default Header