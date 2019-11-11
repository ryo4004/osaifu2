import React from 'react'

import './footer.scss'

const Footer = () => (
  <footer className='footer'>
    <div className='frame'>
      <small>&copy; {new Date().getFullYear()} おさいふ</small>
    </div>
  </footer>
)

export default Footer
