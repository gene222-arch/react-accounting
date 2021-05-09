import ACTION_TYPES from './action.types';

const {
    GET_ACCOUNTS_START,
    GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_FAILED,

    CREATE_ACCOUNT_START,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILED,

    UPDATE_ACCOUNT_START,
    UPDATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_FAILED,

    DESTROY_ACCOUNTS_START,
    DESTROY_ACCOUNTS_SUCCESS,
    DESTROY_ACCOUNTS_FAILED
} = ACTION_TYPES;


export const getAccounts = (payload = {}) => ({
    type: GET_ACCOUNTS_START,
    payload
});

export const getAccountsSuccess = (payload) => ({
    type: GET_ACCOUNTS_SUCCESS,
    payload
});

export const getAccountsFailed = (payload) => ({
    type: GET_ACCOUNTS_FAILED,
    payload
});

export const createAccount = (payload) => ({
    type: CREATE_ACCOUNT_START,
    payload
});

export const createAccountSuccess = () => ({
    type: CREATE_ACCOUNT_SUCCESS
});

export const createAccountFailed = (payload) => ({
    type: CREATE_ACCOUNT_FAILED,
    payload
});

export const updateAccount = (payload) => ({
    type: UPDATE_ACCOUNT_START,
    payload
});

export const updateAccountSuccess = () => ({
    type: UPDATE_ACCOUNT_SUCCESS
});

export const updateAccountFailed = (payload) => ({
    type: UPDATE_ACCOUNT_FAILED,
    payload
});

export const destroyAccounts = (payload) => ({
    type: DESTROY_ACCOUNTS_START,
    payload
});

export const destroyAccountsSuccess = (payload) => ({
    type: DESTROY_ACCOUNTS_SUCCESS,
    payload
});

export const destroyAccountsFailed = (payload) => ({
    type: DESTROY_ACCOUNTS_FAILED,
    payload
});