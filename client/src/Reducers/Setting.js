import * as ActionType from '../Actions/Constants/Setting'

const initialState = {
  loading: false,
  username: '',
  err: false
}

export default function settingReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.SETTING_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.SETTING_CHANGE_USERNAME:
      return {
        ...state,
        username: action.payload.username
      }
    case ActionType.SETTING_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}