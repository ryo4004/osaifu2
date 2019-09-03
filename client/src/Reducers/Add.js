import * as ActionType from '../Actions/Constants/Add'

const initialState = {
  modal: false
}

export default function addReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.ADD_SET_MODAL:
      return {
        ...state,
        modal: action.payload.modal
      }
    default:
      return state
  }
}