import * as ActionType from '../Actions/Constants/Setting'

const initialState = {
  loading: false,
  name: '',
  err: false
}

export default function settingReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.SETTING_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.SETTING_CHANGE_NAME:
      return {
        ...state,
        name: action.payload.name
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