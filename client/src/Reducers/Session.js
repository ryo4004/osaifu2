import * as ActionType from '../Actions/Constants/Session'

const initialState = {
  loading: false,
  user: false,
  err: false
}

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.SESSION_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.SESSION_SET_USER:
      return {
        ...state,
        user: action.payload.user
      }
    case ActionType.SESSION_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}