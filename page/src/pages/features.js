import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import './features.scss'

const Features = () => (
  <Layout>
    <SEO title="特徴" />
    <div className='features'>
      <div className='title'>
        <div><h1>特徴</h1></div>
      </div>
      <section className='features-home text' id='features'>
      <a href='https://osaifu.zatsuzen.com'>アカウント作成はこちら</a>
        <div className='first-feature feature'>
          <h2>お金のことで揉めない</h2>
          <p>
            ふたりで過ごすためのお金をどちらがどれだけ負担するのか、どう管理するのか考えるのはやっかいです。
            ふたりの価値観にもよりますが、割り勘にするのか、どこまで負担するのか。
            いっしょに暮らし始めると日用品や家賃など支払いも増え、清算するのもひと手間になってしまいます。
            おさいふはそんなふたりのためのお金の管理ツールです。
          </p>
        </div>

        <div className='second-feature feature'>
          <h2>ふたりでいっしょに記録</h2>
          <p>
            このアプリではふたりのスマホからひとつのデータベースに記録できます。
            ふたりで使うものを買ったらすぐに記録しましょう。
            お互いが入力した記録をそれぞれのスマホで確認できます。
          </p>
        </div>

        <div className='third-feature feature'>
          <h2>記録はかんたん</h2>
          <p>
            項目は「金額」さえあればOK。「記録日」や「メモ」も追加できます。
            また、それぞれがお金を出し合って購入した場合はそれも記録できます。
          </p>
        </div>

        <div className='fourth-feature feature'>
          <h2>こんなひとに</h2>
          <ul>
            <li>おごるのが当たり前でないひと</li>
            <li>これから同棲しようとしているひと</li>
            <li>お金の管理がずさんになりがちなひと</li>
          </ul>
        </div>
      </section>
    </div>
  </Layout>
)

export default Features
