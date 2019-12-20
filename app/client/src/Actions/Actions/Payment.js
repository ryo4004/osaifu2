import * as ActionType from '../Constants/Payment'

export const loading = (loading) => ({
  type: ActionType.PAYMENT_LOADING,
  payload: { loading }
})

export const setModal = (modal) => ({
  type: ActionType.PAYMENT_SET_MODAL,
  payload: { modal }
})

export const setUseDate = (useDate) => ({
  type: ActionType.PAYMENT_SET_USE_DATE,
  payload: { useDate }
})

export const setDate = (date) => ({
  type: ActionType.PAYMENT_SET_DATE,
  payload: { date }
})

export const setPayment = (payment) => ({
  type: ActionType.PAYMENT_SET_PAYMENT,
  payload: { payment }
})

export const setPaymentCheck = (paymentCheck) => ({
  type: ActionType.PAYMENT_SET_PAYMENT_CHECK,
  payload: { paymentCheck }
})

export const setSelfPayment = (selfPayment) => ({
  type: ActionType.PAYMENT_SET_SELF_PAYMENT,
  payload: { selfPayment }
})

export const setOtherPayment = (otherPayment) => ({
  type: ActionType.PAYMENT_SET_OTHER_PAYMENT,
  payload: { otherPayment }
})

export const setMemo = (memo) => ({
  type: ActionType.PAYMENT_SET_MEMO,
  payload: { memo }
})

export const sendPayment = () => ({
  type: ActionType.PAYMENT_SEND_PAYMENT
})

export const setError = (err) => ({
  type: ActionType.PAYMENT_SET_ERROR,
  payload: { err }
})