import * as ActionType from '../Constants/Toast'

export const showToast = (message) => ({
  type: ActionType.TOAST_SHOW_TOAST,
  payload: { message }
})

export const show = () => ({
  type: ActionType.TOAST_SHOW,
  payload: {
    status: true
  }
})

export const hide = () => ({
  type: ActionType.TOAST_HIDE,
  payload: {
    hide: true
  }
})

export const end = () => ({
  type: ActionType.TOAST_END,
  payload: {
    status: false,
    message: '',
    hide: false
  }
})