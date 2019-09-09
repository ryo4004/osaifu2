import * as ActionType from '../Actions/Constants/Add'

const initialState = {
  modal: false,
  name: '',
  err: false
}

export default function addReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.ADD_SET_MODAL:
      return {
        ...state,
        modal: action.payload.modal
      }
    case ActionType.ADD_CHANGE_NAME:
      return {
        ...state,
        name: action.payload.name
      }
    case ActionType.ADD_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}