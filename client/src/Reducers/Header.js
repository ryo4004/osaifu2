import * as ActionType from '../Actions/Constants/Header'

const initialState = {
  title: 'おさいふ'
}

export default function headerReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.HEADER_SET_TITLE:
      return {
        ...state,
        title: action.payload.title
      }
    default:
      return state
  }
}