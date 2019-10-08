import * as ActionType from '../Constants/Tutorial'

export const setModal = (modal) => ({
  type: ActionType.TUTORIAL_SET_MODAL,
  payload: { modal }
})