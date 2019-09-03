import * as ActionType from '../Constants/Header'

export const setTitle = (title) => ({
  type: ActionType.HEADER_SET_TITLE,
  payload: { title }
})