import * as ActionType from '../Actions/Constants/Tutorial'

const initialState = {
  loading: false,
  modal: false
}

export default function tutorialReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.TUTORIAL_SET_MODAL:
      return {
        ...state,
        modal: action.payload.modal
      }
    default:
      return state
  }
}