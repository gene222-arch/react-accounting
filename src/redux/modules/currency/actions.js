import ACTION_TYPES from './action.types';

const {
    GET_CURRENCIES_START,
    GET_CURRENCIES_SUCCESS,
    GET_CURRENCIES_FAILED,

    CREATE_CURRENCY_START,
    CREATE_CURRENCY_SUCCESS,
    CREATE_CURRENCY_FAILED,

    UPDATE_CURRENCY_START,
    UPDATE_CURRENCY_SUCCESS,
    UPDATE_CURRENCY_FAILED,

    DESTROY_CURRENCIES_START,
    DESTROY_CURRENCIES_SUCCESS,
    DESTROY_CURRENCIES_FAILED
} = ACTION_TYPES;


export const getCurrencies = (payload = {}) => ({
    type: GET_CURRENCIES_START,
    payload
});

export const getCurrenciesSuccess = (payload) => ({
    type: GET_CURRENCIES_SUCCESS,
    payload
});

export const getCurrenciesFailed = (payload) => ({
    type: GET_CURRENCIES_FAILED,
    payload
});

export const createCurrency = (payload) => ({
    type: CREATE_CURRENCY_START,
    payload
});

export const createCurrencySuccess = () => ({
    type: CREATE_CURRENCY_SUCCESS
});

export const createCurrencyFailed = (payload) => ({
    type: CREATE_CURRENCY_FAILED,
    payload
});

export const updateCurrency = (payload) => ({
    type: UPDATE_CURRENCY_START,
    payload
});

export const updateCurrencySuccess = () => ({
    type: UPDATE_CURRENCY_SUCCESS
});

export const updateCurrencyFailed = (payload) => ({
    type: UPDATE_CURRENCY_FAILED,
    payload
});

export const destroyCurrencies = (payload) => ({
    type: DESTROY_CURRENCIES_START,
    payload
});

export const destroyCurrenciesSuccess = (payload) => ({
    type: DESTROY_CURRENCIES_SUCCESS,
    payload
});

export const destroyCurrenciesFailed = (payload) => ({
    type: DESTROY_CURRENCIES_FAILED,
    payload
});