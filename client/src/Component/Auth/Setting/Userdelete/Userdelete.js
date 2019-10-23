import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'

import { changeDeletePassword, requestUserdelete } from '../../../../Actions/Actions/Setting'
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
  setBack: (back) => dispatch(setBack(back))
})

const Userdelete = ({
  loading, deletePassword, err, user,
  changeDeletePassword, requestUserdelete, setTitle, setBack
}) => {

  useEffect(() => {
    setTitle('アカウントの削除')
    setBack('/setting')
    return () => {
      setBack(false)
    }
  }, [])

  const request = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
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
    if (e.which === 13) requestChangeUsername()
  }

  return (
    <div className='setting-username'>
      <div className='text'>
        <p>アカウントを削除すると、すべての記録が削除されます。</p>
        <p>おさいふを共有している場合は相手のおさいふに記録が残ります。</p>
        <p>この操作は取り消せません。</p>
      </div>
      <div className='form'>
        <label>パスワードを入力してください</label>
        <input type='password' value={deletePassword} onChange={(e) => changeDeletePassword(e.target.value)} onKeyPress={(e) => keyPress(e)} />
        <button onClick={() => request()}>削除</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Userdelete)