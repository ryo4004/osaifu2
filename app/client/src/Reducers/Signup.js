import * as ActionType from '../Actions/Constants/Signup'

const initialState = {
  loading: false,
  userid: '',
  password: '',
  agreement: false,
  err: false
}

export default function signupReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.SIGNUP_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.SIGNUP_CHANGE_USERID:
      return {
        ...state,
        userid: action.payload.userid
      }
    case ActionType.SIGNUP_CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload.password
      }
    case ActionType.SIGNUP_CHANGE_AGREEMENT:
      return {
        ...state,
        agreement: action.payload.agreement
      }
    case ActionType.SIGNUP_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}