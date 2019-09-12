import * as ActionType from '../Actions/Constants/List'

const initialState = {
  loading: false,
  list: [],
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
    case ActionType.LIST_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}