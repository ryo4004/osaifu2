import { prefix } from '../Actions/Constants/Login'

const initialState = {
  loading: false,
  userid: '',
  password: '',
  err: false
}

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    case prefix + 'CHANGE_USERID':
      return {
        ...state,
        userid: action.payload.userid
      }
    case prefix + 'CHANGE_PASSWORD':
      return {
        ...state,
        password: action.payload.password
      }
    case prefix + 'SET_ERROR':
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}