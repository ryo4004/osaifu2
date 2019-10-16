import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { requestList } from '../../../Actions/Actions/List'
import { setTitle } from '../../../Actions/Actions/Header'
import { setModal, setContent } from '../../../Actions/Actions/Detail'

import * as lib from '../../../Library/Library'

import './List.css'

const mapStateToProps = (state) => ({
  loading: state.list.loading,
  list: state.list.list
})

const mapDispatchToProps = (dispatch) => ({
  requestList: () => dispatch(requestList()),
  setTitle: (title) => dispatch(setTitle(title)),
  setModal: (modal) => dispatch(setModal(modal)),
  setContent: (content) => dispatch(setContent(content))
})

const List = ({
  loading, list,
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

  const showList = () => {
    if (!list) return
    if (list.length === 0) return <div className='no-data'>記録がありません</div>
    return (
      <ul>
        {list.map((each, i) => {
          const date = (each.useDate ? lib.unixDateTime(each.paymentDate) : each.createdAt).split('T')[0].replace(/-/g, '/')
          return (
            <li key={'list' + i} onClick={() => openModal(each)}>
              <div className='date'>{date}</div>
              <div className='payment'>{lib.addSeparator(parseInt(each.payment))}<span>円</span></div>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className='list contents'>
      <div className='contents-inner'>
        {showList()}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(List)