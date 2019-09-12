import * as ActionType from '../Actions/Constants/Detail'

const initialState = {
  loading: false,
  modal: false,
  content: false,
  err: false
}

export default function detailReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.DETAIL_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.DETAIL_SET_MODAL:
      return {
        ...state,
        modal: action.payload.modal
      }
    case ActionType.DETAIL_SET_CONTENT:
      return {
        ...state,
        content: action.payload.content
      }
    case ActionType.DETAIL_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}