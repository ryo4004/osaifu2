import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { requestList } from '../../../Actions/Actions/List'
import { setTitle } from '../../../Actions/Actions/Header'
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
  setModal: (modal) => dispatch(setModal(modal)),
  setContent: (content) => dispatch(setContent(content))
})

const List = ({
  loading, list, calcList, summary, user, status,
  requestList, setTitle, setModal, setContent
}) => {

  useEffect(() => {
    setTitle('履歴')
    requestList()
    return () => {
      setModal(false)
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
    if (!summary) return
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
          <summary><div><label></label><div>{lib.getSymbol(summary[selfType] - charge[selfType]) + lib.addSeparator(Math.abs(summary[selfType] - charge[selfType]))}<span>円</span></div></div></summary>
          <div><label>支払計</label><div>{lib.addSeparator(summary.payment)}<span>円</span></div></div>
          <div><label>{selfName}の支払計</label><div>{lib.addSeparator(summary[selfType])}<span>円</span></div></div>
          <div><label>{otherName}の支払計</label><div>{lib.addSeparator(summary[otherType])}<span>円</span></div></div>
          <div><label>{selfName}の負担</label><div>{lib.addSeparator(charge[selfType])}<span>円</span></div></div>
          <div><label>{otherName}の負担</label><div>{lib.addSeparator(charge[otherType])}<span>円</span></div></div>
          {showRate()}
        </details>
      </div>
    )
  }

  const showList = () => {
    if (!calcList) return
    if (calcList.size === 0) return <div className='no-data'>記録がありません</div>
    return (
      <ol className='list'>
        {Array.from(calcList.keys()).map((eachDay, i) => {
          let paymentSum = 0, hostSum = 0, clientSum = 0
          const listEachDay = calcList.get(eachDay).map((eachPayment, j) => {
            const date = eachPayment.useDate === 'true' ? false : <div className='date'>{lib.unixTime(eachPayment.sendDate)}</div>
            paymentSum += parseInt(eachPayment.payment)
            hostSum += parseInt(eachPayment.hostPayment)
            clientSum += parseInt(eachPayment.clientPayment)
            return (
              <li key={'list' + i + j} onClick={() => openModal(eachPayment)} onTouchStart={() => {}}>
                {date}
                <div className='payment'>{lib.addSeparator(parseInt(eachPayment.payment))}<span>円</span></div>
              </li>
            )
          })
          return <details key={'day-' + i}><summary><div><span className='date'>{eachDay.replace(/-/g, '/')}</span><div>{lib.addSeparator(paymentSum)}<span>円</span></div></div></summary><ol>{listEachDay}</ol></details>
        })}
      </ol>
    )
  }

  return (
    <div className='list contents'>
      <div className='contents-inner'>
        {showLoading()}
        {showSummary()}
        <label className='history'>履歴</label>
        {showList()}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(List)