import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import './guide.scss'

const Guide = () => (
  <Layout>
    <SEO title="ご利用方法" />
    <div className='guide'>
      <div className='title'>
        <div><h1>ご利用方法</h1></div>
      </div>
      <section>
        <a href='https://osaifu.zatsuzen.com'>アカウント作成はこちら</a>
        <ol className='main-guide'>
          <li>お金を払ったら記録します</li>
          <li>履歴タブでどちらがどれだけ払っているか確認できます</li>
          <li>少なく払っている方が次回の支払いをするとバランスがよくなります</li>
        </ol>
        <h2>支払いの登録</h2>
        <ol className='guide'>
          <li>支払額を入力します</li>
          <li>2人で出し合った場合は支払分担にそれぞれの支払額を入力します</li>
          <li>登録します</li>
        </ol>
        <h2>履歴の削除</h2>
        <ol className='guide'>
          <li>履歴一覧から記録を選びます</li>
          <li>詳細から削除します</li>
        </ol>
        <h2>負担率の変更</h2>
        <p>2人の収入に差がある場合など家計の負担率を設定できます</p>
        <ol className='guide'>
          <li>設定から負担率の変更ができます</li>
          <li>数値は0から100までで単位は%です</li>
        </ol>
      </section>
    </div>
  </Layout>
)

export default Guide
