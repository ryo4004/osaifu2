import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeOsaifuname, requestChangeOsaifuname } from '../../../../Actions/Actions/Setting'
import { setTitle, setBack } from '../../../../Actions/Actions/Header'

import './Osaifuname.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  osaifuname: state.setting.osaifuname,
  err: state.setting.err,
  status: state.status.status
})

const mapDispatchToProps = (dispatch) => ({
  changeOsaifuname: (username) => dispatch(changeOsaifuname(username)),
  requestChangeOsaifuname: () => dispatch(requestChangeOsaifuname()),
  setTitle: (title) => dispatch(setTitle(title)),
  setBack: (back) => dispatch(setBack(back))
})

const Osaifuname = ({
  osaifuname, status,
  changeOsaifuname, requestChangeOsaifuname, setTitle, setBack
}) => {

  useEffect(() => {
    setTitle('おさいふ名の変更')
    setBack('/setting')
    status && changeOsaifuname(status.name)
    return () => {
      setBack(false)
    }
  }, [])

  const keyPress = (e) => {
    if (e.which === 13) requestChangeOsaifuname()
  }

  return (
    <div className='setting-osaifuname'>
      <div className='form'>
        <label>表示名</label>
        <input type='text' value={osaifuname} onChange={(e) => changeOsaifuname(e.target.value)} onKeyPress={(e) => keyPress(e)} />
        <button onClick={() => requestChangeOsaifuname()}>送信</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Osaifuname)