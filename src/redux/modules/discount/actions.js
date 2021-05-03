import ACTION_TYPES from './action.types';

const {
    GET_DISCOUNTS_START,
    GET_DISCOUNTS_SUCCESS,
    GET_DISCOUNTS_FAILED,

    CREATE_DISCOUNT_START,
    CREATE_DISCOUNT_SUCCESS,
    CREATE_DISCOUNT_FAILED,

    UPDATE_DISCOUNT_START,
    UPDATE_DISCOUNT_SUCCESS,
    UPDATE_DISCOUNT_FAILED,

    DESTROY_DISCOUNTS_START,
    DESTROY_DISCOUNTS_SUCCESS,
    DESTROY_DISCOUNTS_FAILED
} = ACTION_TYPES;


export const getDiscounts = (payload = {}) => ({
    type: GET_DISCOUNTS_START,
    payload
});

export const getDiscountsSuccess = (payload) => ({
    type: GET_DISCOUNTS_SUCCESS,
    payload
});

export const getDiscountsFailed = (payload) => ({
    type: GET_DISCOUNTS_FAILED,
    payload
});

export const createDiscount = (payload) => ({
    type: CREATE_DISCOUNT_START,
    payload
});

export const createDiscountSuccess = () => ({
    type: CREATE_DISCOUNT_SUCCESS
});

export const createDiscountFailed = (payload) => ({
    type: CREATE_DISCOUNT_FAILED,
    payload
});

export const updateDiscount = (payload) => ({
    type: UPDATE_DISCOUNT_START,
    payload
});

export const updateDiscountSuccess = () => ({
    type: UPDATE_DISCOUNT_SUCCESS
});

export const updateDiscountFailed = (payload) => ({
    type: UPDATE_DISCOUNT_FAILED,
    payload
});

export const destroyDiscounts = (payload) => ({
    type: DESTROY_DISCOUNTS_START,
    payload
});

export const destroyDiscountsSuccess = (payload) => ({
    type: DESTROY_DISCOUNTS_SUCCESS,
    payload
});

export const destroyDiscountsFailed = (payload) => ({
    type: DESTROY_DISCOUNTS_FAILED,
    payload
});