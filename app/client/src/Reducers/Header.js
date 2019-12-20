import * as ActionType from '../Actions/Constants/Header'

const initialState = {
  title: 'おさいふ',
  back: false,
  add: false
}

export default function headerReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.HEADER_SET_TITLE:
      return {
        ...state,
        title: action.payload.title
      }
    case ActionType.HEADER_SET_BACK:
      return {
        ...state,
        back: action.payload.back
      }
    case ActionType.HEADER_SET_ADD:
      return {
        ...state,
        add: action.payload.add
      }
    default:
      return state
  }
}