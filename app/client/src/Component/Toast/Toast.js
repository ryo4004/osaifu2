import React from 'react'
import { connect } from 'react-redux'

import './Toast.css'

const mapStateToProps = (state) => ({
  status: state.toast.status,
  message: state.toast.message,
  hide: state.toast.hide,
})

const mapDispatchToProps = () => ({})

const Toast = ({ status, message, hide }) => {

  const showToast = () => {
    if (!status) return <div></div>
    const className = hide ? 'toast hide' : 'toast'
    return (
      <div className={className}>
        <div>
          {message}
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      {showToast()}
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast)