import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import './terms.scss'

const Terms = () => (
  <Layout>
    <SEO title="利用規約" />
    <div className='terms'>
      <section>
        <h1>利用規約</h1>
        <ol className='main-terms'>
          <li>
            <h2>本規約の適用</h2>
            <p>
              あかね(以下弊社)が提供しているおさいふ(以下当サービス)において、以下のように利用規約を定めています。
              当サービスを利用するには以下について同意する必要があります。
            </p>
          </li>
          <li>
            <h2>利用登録</h2>
            <p>
              あかねが提供している当サービスにおいて、以下のように利用規約を定めています。
              サービスを利用するには以下について同意する必要があります。
            </p>
          </li>
        </ol>
      </section>
    </div>
  </Layout>
)

export default Terms
