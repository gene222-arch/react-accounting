import ACTION_TYPES from './action.types';

const {
    GET_TAXES_START,
    GET_TAXES_SUCCESS,
    GET_TAXES_FAILED,

    CREATE_TAX_START,
    CREATE_TAX_SUCCESS,
    CREATE_TAX_FAILED,

    UPDATE_TAX_START,
    UPDATE_TAX_SUCCESS,
    UPDATE_TAX_FAILED,

    DESTROY_TAXES_START,
    DESTROY_TAXES_SUCCESS,
    DESTROY_TAXES_FAILED
} = ACTION_TYPES;


export const getTaxes = (payload = {}) => ({
    type: GET_TAXES_START,
    payload
});

export const getTaxesSuccess = (payload) => ({
    type: GET_TAXES_SUCCESS,
    payload
});

export const getTaxesFailed = (payload) => ({
    type: GET_TAXES_FAILED,
    payload
});

export const createTax = (payload) => ({
    type: CREATE_TAX_START,
    payload
});

export const createTaxSuccess = () => ({
    type: CREATE_TAX_SUCCESS
});

export const createTaxFailed = (payload) => ({
    type: CREATE_TAX_FAILED,
    payload
});

export const updateTax = (payload) => ({
    type: UPDATE_TAX_START,
    payload
});

export const updateTaxSuccess = () => ({
    type: UPDATE_TAX_SUCCESS
});

export const updateTaxFailed = (payload) => ({
    type: UPDATE_TAX_FAILED,
    payload
});

export const destroyTaxes = (payload) => ({
    type: DESTROY_TAXES_START,
    payload
});

export const destroyTaxesSuccess = (payload) => ({
    type: DESTROY_TAXES_SUCCESS,
    payload
});

export const destroyTaxesFailed = (payload) => ({
    type: DESTROY_TAXES_FAILED,
    payload
});