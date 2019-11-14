import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from './footer'
import './reset.scss'
import './base.scss'
import './layout.scss'

const Layout = ({ children, index }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <React.Fragment>
      <Header siteTitle={data.site.siteMetadata.title} index={index} />
      <div className='layout'>
        <main>{children}</main>
      </div>
      <Footer />
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.bool
}

Header.defaultProps = {
  children: false,
  index: false
}

export default Layout