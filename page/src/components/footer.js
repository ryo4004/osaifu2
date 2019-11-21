import React from 'react'
import { Link } from 'gatsby'

import './footer.scss'

const Footer = () => (
  <footer className='footer'>
    <div className='contents'>
      <div className='links'>
        <Link to='/'>ホーム</Link>
        <Link to='/features'>特徴</Link>
        <Link to='/guide'>ご利用方法</Link>
        <Link to='/terms'>利用規約</Link>
        <Link to='/policy'>個人情報保護方針</Link>
      </div>
      <small>&copy; {new Date().getFullYear()} おさいふ</small>
    </div>
  </footer>
)

export default Footer
