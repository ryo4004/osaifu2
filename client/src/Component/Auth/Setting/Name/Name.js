import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeName, requestChangeName } from '../../../../Actions/Actions/Setting'
import { setTitle } from '../../../../Actions/Actions/Header'

import './Name.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  name: state.setting.name,
  err: state.setting.err
})

const mapDispatchToProps = (dispatch) => ({
  changeName: (name) => dispatch(changeName(name)),
  requestChangeName: () => dispatch(requestChangeName()),
  setTitle: (title) => dispatch(setTitle(title))
})

const Name = ({
  loading, name, err,
  changeName, requestChangeName, setTitle
}) => {

  useEffect(() => {
    setTitle('名前の変更')
  }, [])

  return (
    <div className='setting-name'>
      <div className='form'>
        <input value={name} onChange={(e) => changeName(e.target.value)} />
        <button onClick={() => requestChangeName()}>送信</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Name)