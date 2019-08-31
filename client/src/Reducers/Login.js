import * as ActionType from '../Actions/Constants/Login'

const initialState = {
  loading: false,
  userid: '',
  password: '',
  err: false
}

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.LOGIN_CHANGE_USERID:
      return {
        ...state,
        userid: action.payload.userid
      }
    case ActionType.LOGIN_CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload.password
      }
    case ActionType.LOGIN_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}