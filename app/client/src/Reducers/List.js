import * as ActionType from '../Actions/Constants/List'

const initialState = {
  loading: false,
  list: [],
  calcList: false,
  summary: false,
  err: false
}

export default function listReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.LIST_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.LIST_SET_LIST:
      return {
        ...state,
        list: action.payload.list
      }
    case ActionType.LIST_SET_CALC_LIST:
      return {
        ...state,
        calcList: action.payload.calcList
      }
    case ActionType.LIST_SET_SUMMARY:
      return {
        ...state,
        summary: action.payload.summary
      }
    case ActionType.LIST_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}