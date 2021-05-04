import ACTION_TYPES from './action.types';

const {
    GET_CUSTOMERS_START,
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_FAILED,

    CREATE_CUSTOMER_START,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_FAILED,

    UPDATE_CUSTOMER_START,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAILED,

    DESTROY_CUSTOMERS_START,
    DESTROY_CUSTOMERS_SUCCESS,
    DESTROY_CUSTOMERS_FAILED
} = ACTION_TYPES;


export const getCustomers = (payload = {}) => ({
    type: GET_CUSTOMERS_START,
    payload
});

export const getCustomersSuccess = (payload) => ({
    type: GET_CUSTOMERS_SUCCESS,
    payload
});

export const getCustomersFailed = (payload) => ({
    type: GET_CUSTOMERS_FAILED,
    payload
});

export const createCustomer = (payload) => ({
    type: CREATE_CUSTOMER_START,
    payload
});

export const createCustomerSuccess = () => ({
    type: CREATE_CUSTOMER_SUCCESS
});

export const createCustomerFailed = (payload) => ({
    type: CREATE_CUSTOMER_FAILED,
    payload
});

export const updateCustomer = (payload) => ({
    type: UPDATE_CUSTOMER_START,
    payload
});

export const updateCustomerSuccess = () => ({
    type: UPDATE_CUSTOMER_SUCCESS
});

export const updateCustomerFailed = (payload) => ({
    type: UPDATE_CUSTOMER_FAILED,
    payload
});

export const destroyCustomers = (payload) => ({
    type: DESTROY_CUSTOMERS_START,
    payload
});

export const destroyCustomersSuccess = (payload) => ({
    type: DESTROY_CUSTOMERS_SUCCESS,
    payload
});

export const destroyCustomersFailed = (payload) => ({
    type: DESTROY_CUSTOMERS_FAILED,
    payload
});