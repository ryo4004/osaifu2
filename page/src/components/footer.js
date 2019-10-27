import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import './footer.scss'

const Footer = ({ siteTitle }) => (
  <footer>
    <small>&copy; {new Date().getFullYear()} akanewz</small>
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: '',
}

export default Footer
