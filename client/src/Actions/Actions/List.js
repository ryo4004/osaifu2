import * as ActionType from '../Constants/List'

export const loading = (loading) => ({
  type: ActionType.LIST_LOADING,
  payload: { loading }
})

export const requestList = () => ({
  type: ActionType.LIST_REQUEST_LIST
})

export const setList = (list) => ({
  type: ActionType.LIST_SET_LIST,
  payload: { list }
})

export const setCalcList = (calcList) => ({
  type: ActionType.LIST_SET_CALC_LIST,
  payload: { calcList }
})

export const setSummary = (summary) => ({
  type: ActionType.LIST_SET_SUMMARY,
  payload: { summary }
})

export const setError = (err) => ({
  type: ActionType.LIST_SET_ERROR,
  payload: { err }
})