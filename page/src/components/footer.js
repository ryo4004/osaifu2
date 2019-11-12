import React from 'react'
import { Link } from 'gatsby'

import './footer.scss'

const Footer = () => (
  <footer className='footer'>
    <div className='contents'>
      <small>&copy; {new Date().getFullYear()} おさいふ</small>
      <div className='links'>
        <Link to='/'>ホーム</Link>
        <Link to='/terms'>利用規約</Link>
        <Link to='/privacy'>個人情報保護方針</Link>
      </div>
    </div>
  </footer>
)

export default Footer
