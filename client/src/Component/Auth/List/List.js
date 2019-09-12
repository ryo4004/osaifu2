import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { requestList } from '../../../Actions/Actions/List'
import { setTitle } from '../../../Actions/Actions/Header'

import * as lib from '../../../Library/Library'

import './List.css'

const mapStateToProps = (state) => ({
  loading: state.list.loading,
  list: state.list.list
})

const mapDispatchToProps = (dispatch) => ({
  requestList: () => dispatch(requestList()),
  setTitle: (title) => dispatch(setTitle(title))
})

const List = ({
  loading, list,
  requestList, setTitle
}) => {

  useEffect(() => {
    setTitle('履歴')
    requestList()
  }, [])

  const showList = () => {
    if (!list) return
    console.log(list)
    return (
      <ul>
        {list.map((each, i) => {
          const date = (each.useDate ? lib.unixDateTime(each.paymentDate) : each.createdAt).split('T')[0].replace('-', '/')
          return (
            <li key={'list' + i}>
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