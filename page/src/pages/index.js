import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Screenshot from '../images/component/screenshot'
import Screenshot2 from '../images/component/screenshot2'

import './index.scss'

const IndexPage = () => {

  const [ screenshot, setScreenshot ] = useState(false)

  const changeScreenshot = () => {
    setScreenshot(!screenshot)
  }

  useEffect(() => {
    const switchScreenshot = setInterval(changeScreenshot, 10000)
    return () => clearInterval(switchScreenshot)
  })

  const showScreenshot = () => {
    return screenshot ? <Screenshot /> : <Screenshot2 />
  }

  return (
    <Layout index={true}>
      <SEO title="おさいふ" index={true} />
      <div className='index'>
        <div className='top'>
          <div className='contents'>
            <div className='title'>
              <div>
                <h1>おさいふ</h1>
                <p>ふたりでつける家計簿アプリ</p>
                <a href='https://app.osaifu.zatsuzen.com/signup' className='web-app'>使ってみる</a>
                <a href="https://apps.apple.com/jp/app/%E3%81%8A%E3%81%95%E3%81%84%E3%81%B5-%E3%81%B5%E3%81%9F%E3%82%8A%E3%81%A7%E3%81%A4%E3%81%91%E3%82%8B%E5%AE%B6%E8%A8%88%E7%B0%BF%E3%82%A2%E3%83%97%E3%83%AA/id1493183772?mt=8" className='apple-app-link'>&nbsp;</a>
                <a href='https://play.google.com/store/apps/details?id=com.zatsuzen.osaifu&hl=ja&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' className='android-app-link'><img alt='Google Play で手に入れよう' src='https://play.google.com/intl/en_us/badges/static/images/badges/ja_badge_web_generic.png'/></a>
              </div>
            </div>
            <div className='image'>
              <div className='device'>
                <div className='screenshot'>{showScreenshot()}</div>
              </div>
            </div>
          </div>
        </div>
        
        <section className='features-home text' id='features'>
          <h2>特徴</h2>
          <div className='first-feature feature'>
            <h3>お金のことで揉めない</h3>
            <p>
              ふたりで過ごすためのお金をどちらがどれだけ負担するのか、どう管理するのか考えるのはやっかいです。
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
}

export default IndexPage
