import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import './privacy.scss'

const Privacy = () => (
  <Layout>
    <SEO title="個人情報保護方針" />
    <div className='terms'>
      <section>
        <h1>個人情報保護方針</h1>
        <h2>本規約の適用</h2>
        <p>
          あかね(以下弊社)が提供しているおさいふ(以下当サービス)において、以下のように利用規約を定めています。
          当サービスを利用するには以下について同意する必要があります。
        </p>
        <h2>利用登録</h2>
        <p>
          あかねが提供している当サービスにおいて、以下のように利用規約を定めています。
          サービスを利用するには以下について同意する必要があります。
        </p>
      </section>
    </div>
  </Layout>
)

export default Privacy
