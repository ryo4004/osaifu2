import React, { useState, useEffect } from "react"

import { Link } from 'gatsby'

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
                <a href='https://osaifu.zatsuzen.com'>使ってみる</a>
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
