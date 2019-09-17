import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeOldPassword, changeNewPassword, requestChangePassword } from '../../../../Actions/Actions/Setting'
import { setTitle, setBack } from '../../../../Actions/Actions/Header'

import './Password.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  oldPassword: state.setting.oldPassword,
  newPassword: state.setting.newPassword,
  err: state.setting.err
})

const mapDispatchToProps = (dispatch) => ({
  changeOldPassword: (oldPassword) => dispatch(changeOldPassword(oldPassword)),
  changeNewPassword: (newPassword) => dispatch(changeNewPassword(newPassword)),
  requestChangePassword: () => dispatch(requestChangePassword()),
  setTitle: (title) => dispatch(setTitle(title)),
  setBack: (back) => dispatch(setBack(back))
})

const Password = ({
  loading, oldPassword, newPassword, err,
  changeOldPassword, changeNewPassword, requestChangePassword, setTitle, setBack
}) => {

  useEffect(() => {
    setTitle('パスワードの変更')
    setBack('/setting')
    return () => {
      setBack(false)
    }
  }, [])

  return (
    <div className='setting-password'>
      <div className='form'>
        <input type='password' value={oldPassword} onChange={(e) => changeOldPassword(e.target.value)} />
        <input type='password' value={newPassword} onChange={(e) => changeNewPassword(e.target.value)} />
        <button onClick={() => requestChangePassword()}>送信</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)