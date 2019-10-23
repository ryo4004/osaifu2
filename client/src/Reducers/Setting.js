import * as ActionType from '../Actions/Constants/Setting'

const initialState = {
  loading: false,
  username: '',
  othername: '',
  oldPassword: '',
  newPassword: '',
  deletePassword: '',
  osaifuname: '',
  rate: '',
  connectMode: true,
  connectPassStatus: false,
  connectPass: '',
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
    case ActionType.SETTING_CHANGE_OTHERNAME:
      return {
        ...state,
        othername: action.payload.othername
      }
    case ActionType.SETTING_CHANGE_OLD_PASSWORD:
      return {
        ...state,
        oldPassword: action.payload.oldPassword
      }
    case ActionType.SETTING_CHANGE_NEW_PASSWORD:
      return {
        ...state,
        newPassword: action.payload.newPassword
      }
    case ActionType.SETTING_CHANGE_DELETE_PASSWORD:
      return {
        ...state,
        deletePassword: action.payload.deletePassword
      }
    case ActionType.SETTING_CHANGE_OSAIFUNAME:
      return {
        ...state,
        osaifuname: action.payload.osaifuname
      }
    case ActionType.SETTING_CHANGE_RATE:
      return {
        ...state,
        rate: action.payload.rate
      }
    case ActionType.SETTING_SET_CONNECT_MODE:
      return {
        ...state,
        connectMode: action.payload.connectMode
      }
    case ActionType.SETTING_SET_CONNECT_PASS_STATUS:
      return {
        ...state,
        connectPassStatus: action.payload.connectPassStatus
      }
    case ActionType.SETTING_CHANGE_CONNECT_PASS:
      return {
        ...state,
        connectPass: action.payload.connectPass
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