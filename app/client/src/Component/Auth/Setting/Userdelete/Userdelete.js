import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'

import { changeDeletePassword, requestUserdelete, setError } from '../../../../Actions/Actions/Setting'
import { setTitle, setBack } from '../../../../Actions/Actions/Header'

import './Userdelete.css'

const mapStateToProps = (state) => ({
  loading: state.setting.loading,
  deletePassword: state.setting.deletePassword,
  err: state.setting.err,
  user: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
  changeDeletePassword: (deletePassword) => dispatch(changeDeletePassword(deletePassword)),
  requestUserdelete: () => dispatch(requestUserdelete()),
  setTitle: (title) => dispatch(setTitle(title)),
  setBack: (back) => dispatch(setBack(back)),
  setError: (err) => dispatch(setError(err))
})

const Userdelete = ({
  deletePassword, err,
  changeDeletePassword, requestUserdelete, setTitle, setBack, setError
}) => {

  useEffect(() => {
    setTitle('アカウントの削除')
    setBack('/setting')
    changeDeletePassword('')
    setError(false)
    return () => {
      setBack(false)
      setError(false)
    }
  }, [])

  const request = () => {
    confirmAlert({
      customUI: function showModal ({ onClose }) {
        return (
          <div className='alert'>
            <h1>削除しますか？</h1>
            <p>この操作は取り消せません。</p>
            <div className='button-group'>
              <button onClick={onClose}>キャンセル</button>
              <button onClick={() => {
                requestUserdelete()
                onClose()
              }}>削除</button>
            </div>
          </div>
        )
      }
    })
  }

  const keyPress = (e) => {
    if (e.which === 13) request()
  }

  const showError = () => {
    if (!err) return false
    let message
    switch (err.type) {
      // Local Error
      case 'blankTextbox':
        message = '入力を確認してください'
        break
      // Server Error
      case 'passwordNotMatch':
        message = 'パスワードが合致しませんでした'
        break
      case 'DBError':
        message = 'データベースエラー'
        break
      default:
        message = 'error: ' + err.type
    }
    return (
      <div className='err'>{message}</div>
    )
  }

  return (
    <div className='setting-username'>
      <div className='text'>
        <p>アカウントを削除すると、おさいふのすべての記録も併せて削除されます。</p>
        <p>おさいふを共有している場合は相手のおさいふに記録が残ります。</p>
        <p>この操作は取り消せません。</p>
      </div>
      <div className='form'>
        <label>パスワードを入力してください</label>
        <input type='password' value={deletePassword} onChange={(e) => changeDeletePassword(e.target.value)} onKeyPress={(e) => keyPress(e)} />
        {showError()}
        <button onClick={() => request()}>削除</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Userdelete)