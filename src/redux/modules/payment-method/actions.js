import ACTION_TYPES from './action.types';

const {
    GET_PAYMENT_METHODS_START,
    GET_PAYMENT_METHODS_SUCCESS,
    GET_PAYMENT_METHODS_FAILED,

    CREATE_PAYMENT_METHOD_START,
    CREATE_PAYMENT_METHOD_SUCCESS,
    CREATE_PAYMENT_METHOD_FAILED,

    UPDATE_PAYMENT_METHOD_START,
    UPDATE_PAYMENT_METHOD_SUCCESS,
    UPDATE_PAYMENT_METHOD_FAILED,

    DESTROY_PAYMENT_METHODS_START,
    DESTROY_PAYMENT_METHODS_SUCCESS,
    DESTROY_PAYMENT_METHODS_FAILED
} = ACTION_TYPES;


export const getPaymentMethods = (payload = {}) => ({
    type: GET_PAYMENT_METHODS_START,
    payload
});

export const getPaymentMethodsSuccess = (payload) => ({
    type: GET_PAYMENT_METHODS_SUCCESS,
    payload
});

export const getPaymentMethodsFailed = (payload) => ({
    type: GET_PAYMENT_METHODS_FAILED,
    payload
});

export const createPaymentMethod = (payload) => ({
    type: CREATE_PAYMENT_METHOD_START,
    payload
});

export const createPaymentMethodSuccess = () => ({
    type: CREATE_PAYMENT_METHOD_SUCCESS
});

export const createPaymentMethodFailed = (payload) => ({
    type: CREATE_PAYMENT_METHOD_FAILED,
    payload
});

export const updatePaymentMethod = (payload) => ({
    type: UPDATE_PAYMENT_METHOD_START,
    payload
});

export const updatePaymentMethodSuccess = () => ({
    type: UPDATE_PAYMENT_METHOD_SUCCESS
});

export const updatePaymentMethodFailed = (payload) => ({
    type: UPDATE_PAYMENT_METHOD_FAILED,
    payload
});

export const destroyPaymentMethods = (payload) => ({
    type: DESTROY_PAYMENT_METHODS_START,
    payload
});

export const destroyPaymentMethodsSuccess = (payload) => ({
    type: DESTROY_PAYMENT_METHODS_SUCCESS,
    payload
});

export const destroyPaymentMethodsFailed = (payload) => ({
    type: DESTROY_PAYMENT_METHODS_FAILED,
    payload
});