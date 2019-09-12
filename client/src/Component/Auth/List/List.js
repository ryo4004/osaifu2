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
    if (!list || loading) return
    console.log(list)
    return (
      <ul>
        {list.map((each, i) => {
          return (
            <li key={'list' + i}>
              <div className='payment'>{each.payment}</div>
              <div className='date'>{each.createdAt}</div>
              <div className='date'>{lib.unixDateTime(each.paymentDate)}</div>
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