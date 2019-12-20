import * as ActionType from '../Actions/Constants/Payment'

const initialState = {
  loading: false,
  modal: false,
  useDate: false,
  date: '',
  payment: '',
  paymentCheck: false,
  selfPayment: '',
  otherPayment: '',
  memo: '',
  err: false
}

export default function paymentReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.PAYMENT_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    case ActionType.PAYMENT_SET_MODAL:
      return {
        ...state,
        modal: action.payload.modal
      }
    case ActionType.PAYMENT_SET_USE_DATE:
      return {
        ...state,
        useDate: action.payload.useDate
      }
    case ActionType.PAYMENT_SET_DATE:
      return {
        ...state,
        date: action.payload.date
      }
    case ActionType.PAYMENT_SET_PAYMENT:
      return {
        ...state,
        payment: action.payload.payment
      }
    case ActionType.PAYMENT_SET_PAYMENT_CHECK:
      return {
        ...state,
        paymentCheck: action.payload.paymentCheck
      }
    case ActionType.PAYMENT_SET_SELF_PAYMENT:
      return {
        ...state,
        selfPayment: action.payload.selfPayment
      }
    case ActionType.PAYMENT_SET_OTHER_PAYMENT:
      return {
        ...state,
        otherPayment: action.payload.otherPayment
      }
    case ActionType.PAYMENT_SET_MEMO:
      return {
        ...state,
        memo: action.payload.memo
      }
    case ActionType.PAYMENT_SET_ERROR:
      return {
        ...state,
        err: action.payload.err
      }
    default:
      return state
  }
}