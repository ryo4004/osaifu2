import React from "react"
import { Link } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

import './404.scss'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 Not found" />
    <div className='not-found'>
      <h1>Not Found</h1>
      <Link to='/'>Home</Link>
    </div>
  </Layout>
)

export default NotFoundPage
