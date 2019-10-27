import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

import './index.scss'

const IndexPage = () => (
  <Layout>
    <SEO title="おさいふ" />
    <div className='index'>
      <div className='top'>
        <div className='title'>
          <h1>おさいふ</h1>
          <p>ふたりでつける家計簿アプリ</p>
        </div>
      </div>
      
      <div className='features'>
        <h2>特徴</h2>
        
      </div>
      <Link to="/page-2">Go to page 2</Link>
    </div>
  </Layout>
)

export default IndexPage
