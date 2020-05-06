import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Open from '../../../Library/Icons/Open'
import Close from '../../../Library/Icons/Close'

import { requestList } from '../../../Actions/Actions/List'
import { setTitle, setAdd } from '../../../Actions/Actions/Header'
import { setModal, setContent } from '../../../Actions/Actions/Detail'

import * as lib from '../../../Library/Library'

import './List.css'

const mapStateToProps = (state) => ({
  loading: state.list.loading,
  list: state.list.list,
  calcList: state.list.calcList,
  summary: state.list.summary,

  user: state.session.user,
  status: state.status.status,
})

const mapDispatchToProps = (dispatch) => ({
  requestList: () => dispatch(requestList()),
  setTitle: (title) => dispatch(setTitle(title)),
  setAdd: (add) => dispatch(setAdd(add)),
  setModal: (modal) => dispatch(setModal(modal)),
  setContent: (content) => dispatch(setContent(content))
})

const List = ({
  loading, calcList, summary, user, status,
  requestList, setTitle, setAdd, setModal, setContent
}) => {

  useEffect(() => {
    setTitle('履歴')
    setAdd(true)
    requestList()
    return () => {
      setModal(false)
      setAdd(false)
    }
  }, [])

  const openModal = (content) => {
    setContent(content)
    setModal(true)
  }

  const showLoading = () => {
    if (loading) return <div className='loading'>読み込み中...</div>
  }

  const showSummary = () => {
    if (!summary || !user || !status) return
    const showRate = () => {
      if (status && user) return <div><label>負担率</label><div>{status.type === 'solo' ? status.rate : (user.userKey === status.host ? status.rate : (100 - parseInt(status.rate)))}<span>%</span></div></div>
    }
    const selfName = user ? user.username : ''
    const otherName = status ? status.othername : ''
    const selfType = status.type === 'solo' ? 'host' : (status.host === user.userKey ? 'host' : 'client')
    const otherType = status.type === 'solo' ? 'client' : (status.host === user.userKey ? 'client' : 'host')
    const hostCharge = Math.round(summary.payment * (parseFloat(status.rate) * 0.01))
    const charge = {
      host: hostCharge,
      client: (summary.payment - hostCharge)
    }
    return (
      <div className='summary'>
        <details>
          <summary>
            <div>
              <label><Open /><Close /></label>
              <div>
                <div>{lib.getSymbol(summary[selfType] - charge[selfType]) + lib.addSeparator(Math.abs(summary[selfType] - charge[selfType]))}<span>円</span></div>
                <p>{lib.getJudgement(summary[selfType] - charge[selfType])}</p>
              </div>
            </div>
          </summary>
          <div>
            <div><label>支払計</label><div>{lib.addSeparator(summary.payment)}<span>円</span></div></div>
            <div><label>{selfName}の支払計</label><div>{lib.addSeparator(summary[selfType])}<span>円</span></div></div>
            <div><label>{otherName}の支払計</label><div>{lib.addSeparator(summary[otherType])}<span>円</span></div></div>
            <div><label>{selfName}の負担</label><div>{lib.addSeparator(charge[selfType])}<span>円</span></div></div>
            <div><label>{otherName}の負担</label><div>{lib.addSeparator(charge[otherType])}<span>円</span></div></div>
            {showRate()}
          </div>
        </details>
      </div>
    )
  }

  const showList = () => {
    if (!calcList) return
    if (calcList.size === 0) return <div className='no-data'>記録がありません</div>
    const selfName = user ? user.username : ''
    const otherName = status ? status.othername : ''
    const selfType = status.type === 'solo' ? 'hostPayment' : (status.host === user.userKey ? 'hostPayment' : 'clientPayment')
    const otherType = status.type === 'solo' ? 'clientPayment' : (status.host === user.userKey ? 'clientPayment' : 'hostPayment')
    return (
      <ol className='list'>
        {Array.from(calcList.keys()).map((eachDay, i) => {
          /* eslint no-unused-vars: 0 */
          let paymentSum = 0, hostSum = 0, clientSum = 0
          const listEachDay = calcList.get(eachDay).map((content, j) => {
            const date = content.useDate === 'true' ? <div className='date-disable'><span>00:00</span><span>なし</span></div> : <div className='date'>{lib.unixTime(content.sendDate)}</div>
            paymentSum += parseInt(content.payment)
            hostSum += parseInt(content.hostPayment)
            clientSum += parseInt(content.clientPayment)
            const percent = parseInt(content[selfType]) / parseInt(content.payment) * 100.0
            const payPercent = percent ? {backgroundSize: percent + '% 100%'} : {backgroundSize: '0% 100%'}
            const paid = Number(content[selfType]) === 0 || Number(content[otherType]) === 0 ? (Number(content[selfType]) !== 0 ? <div className='paid self'></div> : <div className='paid other'></div>) : <div className='paid pair' style={payPercent}></div>
            return (
              <li key={'list' + i + j} onClick={() => openModal(content)} onTouchStart={() => {}}>
                {date}
                {paid}
                <div className='payment'>{lib.addSeparator(parseInt(content.payment))}<span>円</span></div>
              </li>
            )
          })
          return (
            <details key={'day-' + i}>
              <summary onTouchStart={() => {}}>
                <div>
                  <label><Open /><Close /></label>
                  <span className='date'>{eachDay.replace(/-/g, '/')}</span>
                  <div>{lib.addSeparator(paymentSum)}<span>円</span></div>
                </div>
              </summary><ol>{listEachDay}</ol>
            </details>
          )
        })}
      </ol>
    )
  }

  return (
    <div className='contents'>
      <div className='contents-inner'>
        <div className='list'>
          {showLoading()}
          {showSummary()}
          <label className='history'>履歴</label>
          {showList()}
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(List)