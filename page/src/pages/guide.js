import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Screenshot from '../images/component/screenshot'
import Screenshot2 from '../images/component/screenshot2'

import './guide.scss'

const Guide = () => (
  <Layout>
    <SEO title="ご利用方法" />
    <div className='guide'>
      <div className='title'>
        <div><h1>ご利用方法</h1></div>
      </div>
      <section>
        <a href='https://app.osaifu.zatsuzen.com/signup'>アカウント作成はこちら</a>
        <ol className='main-guide'>
          <li>お金を払ったら記録します</li>
          <li>履歴タブでどちらがどれだけ払っているか確認できます</li>
          <li>少なく払っている方が次回の支払いをするとバランスがよくなります</li>
        </ol>
        <h2>Quick Start</h2>
        <p>新しい記録は履歴タブの右上の+ボタンから行います</p>
        <div className='screenshot'>
          <Screenshot2 />
          <div className='target'></div>
        </div>
        <p>支払い登録画面では次の項目を入力します</p>
        <ul>
          <li>日付: 支払った日付</li>
          <li>支払額(必須): 合計支払額</li>
          <li>メモ: 摘要</li>
          <li>支払分担: それぞれがいくら負担したかを指定します</li>
        </ul>
        <p>支払分担の「全額」ボタンを押すと全額指定できます</p>
        <div className='screenshot'>
          <Screenshot />
        </div>

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
        <h2>連携するには</h2>
        <p>アカウントを連携することで2つのアカウントからおさいふに記録できます</p>
        <ol className='guide'>
          <li>設定タブから「おさいふを共有する」を開きます</li>
          <li>ひとりがパス発行をし、発行されたパスをもう一方がパス入力から入力します</li>
          <li>連携前のデータは統合されます</li>
        </ol>
      </section>
    </div>
  </Layout>
)

export default Guide
