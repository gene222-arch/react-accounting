import ACTION_TYPES from './action.types';

const {
    GET_PAYMENTS_START,
    GET_PAYMENTS_SUCCESS,
    GET_PAYMENTS_FAILED,

    CREATE_PAYMENT_START,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILED,

    UPDATE_PAYMENT_START,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILED,

    DESTROY_PAYMENTS_START,
    DESTROY_PAYMENTS_SUCCESS,
    DESTROY_PAYMENTS_FAILED
} = ACTION_TYPES;


export const getPayments = () => ({
    type: GET_PAYMENTS_START
});

export const getPaymentsSuccess = (payload) => ({
    type: GET_PAYMENTS_SUCCESS,
    payload
});

export const getPaymentsFailed = (payload) => ({
    type: GET_PAYMENTS_FAILED,
    payload
});

export const createPayment = (payload) => ({
    type: CREATE_PAYMENT_START,
    payload
});

export const createPaymentSuccess = () => ({
    type: CREATE_PAYMENT_SUCCESS
});

export const createPaymentFailed = (payload) => ({
    type: CREATE_PAYMENT_FAILED,
    payload
});

export const updatePayment = (payload) => ({
    type: UPDATE_PAYMENT_START,
    payload
});

export const updatePaymentSuccess = () => ({
    type: UPDATE_PAYMENT_SUCCESS
});

export const updatePaymentFailed = (payload) => ({
    type: UPDATE_PAYMENT_FAILED,
    payload
});

export const destroyPayments = (payload) => ({
    type: DESTROY_PAYMENTS_START,
    payload
});

export const destroyPaymentsSuccess = (payload) => ({
    type: DESTROY_PAYMENTS_SUCCESS,
    payload
});

export const destroyPaymentsFailed = (payload) => ({
    type: DESTROY_PAYMENTS_FAILED,
    payload
});