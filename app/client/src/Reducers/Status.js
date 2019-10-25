import * as ActionType from '../Actions/Constants/Status'

const initialState = {
  loading: false,
  status: false,
  err: false
}

export default function statusReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.STATUS_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.STATUS_SET_STATUS:
      return {
        ...state,
        status: action.payload.status
      }
    case ActionType.STATUS_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}