import React from "react"

import Layout from "../components/layout"
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
      
      <section className='features'>
        <h2>特徴</h2>
        <div className='first-feature feature'>
          <h3>お金のことで揉めない</h3>
          <p>
            ふたりで過ごすためのお金をどちらがどれだけ負担するのか、たびたびもめることがあります。
            ふたりの価値観にもよりますが、割り勘にするのか、どこまで負担するのか。
            いっしょに暮らし始めると日用品や家賃など支払いも増え、清算するのもひと手間になってしまいます。
            おさいふはそんなふたりのためのお金の管理ツールです。
          </p>
        </div>

        <div className='second-feature feature'>
          <h3>ふたりでいっしょに記録</h3>
          <p>
            このアプリではふたりのスマホそれぞれからひとつのデータベースに記録できます。
            買い物をしたらすぐに記録。
            彼がお金を払ったら彼女が記録。
            お互いが入力した記録をそれぞれのスマホで確認できます。
          </p>
        </div>

        <div className='third-feature feature'>
          <h3>記録はかんたん</h3>
          <p>
            項目は「金額」さえあればOK。「記録日」や「メモ」も追加できます。
            また、それぞれがお金を出し合って購入した場合はそれも記録できます。
          </p>
        </div>

        <div className='fourth-feature feature'>
          <h3>こんなひとに</h3>
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

export default IndexPage
