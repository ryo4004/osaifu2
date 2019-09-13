import * as ActionType from '../Actions/Constants/Toast'

const initialState = {
  status: false,
  message: '',
  hide: false
}

export default function toastReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.TOAST_SHOW_TOAST:
      return {
        ...state,
        message: action.payload.message
      }
    case ActionType.TOAST_SHOW:
      return {
        ...state,
        status: action.payload.status
      }
    case ActionType.TOAST_HIDE:
      return {
        ...state,
        hide: action.payload.hide
      }
    case ActionType.TOAST_END:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        hide: action.payload.hide
      }
    default:
      return state
  }
}