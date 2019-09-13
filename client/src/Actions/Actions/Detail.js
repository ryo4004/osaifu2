import * as ActionType from '../Constants/Detail'

export const loading = (loading) => ({
  type: ActionType.DETAIL_LOADING,
  payload: { loading }
})

export const setModal = (modal) => ({
  type: ActionType.DETAIL_SET_MODAL,
  payload: { modal }
})

export const setContent = (content) => ({
  type: ActionType.DETAIL_SET_CONTENT,
  payload: { content }
})

export const requestDelete = (id) => ({
  type: ActionType.DETAIL_REQUEST_DELETE,
  payload: { id }
})

export const setError = (err) => ({
  type: ActionType.DETAIL_SET_ERROR,
  payload: { err }
})