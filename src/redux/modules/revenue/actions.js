import ACTION_TYPES from './action.types';

const {
    GET_REVENUES_START,
    GET_REVENUES_SUCCESS,
    GET_REVENUES_FAILED,

    CREATE_REVENUE_START,
    CREATE_REVENUE_SUCCESS,
    CREATE_REVENUE_FAILED,

    UPDATE_REVENUE_START,
    UPDATE_REVENUE_SUCCESS,
    UPDATE_REVENUE_FAILED,

    DESTROY_REVENUES_START,
    DESTROY_REVENUES_SUCCESS,
    DESTROY_REVENUES_FAILED
} = ACTION_TYPES;


export const getRevenues = () => ({
    type: GET_REVENUES_START
});

export const getRevenuesSuccess = (payload) => ({
    type: GET_REVENUES_SUCCESS,
    payload
});

export const getRevenuesFailed = (payload) => ({
    type: GET_REVENUES_FAILED,
    payload
});

export const createRevenue = (payload) => ({
    type: CREATE_REVENUE_START,
    payload
});

export const createRevenueSuccess = () => ({
    type: CREATE_REVENUE_SUCCESS
});

export const createRevenueFailed = (payload) => ({
    type: CREATE_REVENUE_FAILED,
    payload
});

export const updateRevenue = (payload) => ({
    type: UPDATE_REVENUE_START,
    payload
});

export const updateRevenueSuccess = () => ({
    type: UPDATE_REVENUE_SUCCESS
});

export const updateRevenueFailed = (payload) => ({
    type: UPDATE_REVENUE_FAILED,
    payload
});

export const destroyRevenues = (payload) => ({
    type: DESTROY_REVENUES_START,
    payload
});

export const destroyRevenuesSuccess = (payload) => ({
    type: DESTROY_REVENUES_SUCCESS,
    payload
});

export const destroyRevenuesFailed = (payload) => ({
    type: DESTROY_REVENUES_FAILED,
    payload
});