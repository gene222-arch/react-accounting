import ACTION_TYPES from './action.types';

const {
    GET_STOCK_ADJUSTMENTS_START,
    GET_STOCK_ADJUSTMENTS_SUCCESS,
    GET_STOCK_ADJUSTMENTS_FAILED,

    CREATE_STOCK_ADJUSTMENT_START,
    CREATE_STOCK_ADJUSTMENT_SUCCESS,
    CREATE_STOCK_ADJUSTMENT_FAILED,

    UPDATE_STOCK_ADJUSTMENT_START,
    UPDATE_STOCK_ADJUSTMENT_SUCCESS,
    UPDATE_STOCK_ADJUSTMENT_FAILED,

    DESTROY_STOCK_ADJUSTMENTS_START,
    DESTROY_STOCK_ADJUSTMENTS_SUCCESS,
    DESTROY_STOCK_ADJUSTMENTS_FAILED
} = ACTION_TYPES;


export const getStockAdjustments = (payload = {}) => ({
    type: GET_STOCK_ADJUSTMENTS_START,
    payload
});

export const getStockAdjustmentsSuccess = (payload) => ({
    type: GET_STOCK_ADJUSTMENTS_SUCCESS,
    payload
});

export const getStockAdjustmentsFailed = (payload) => ({
    type: GET_STOCK_ADJUSTMENTS_FAILED,
    payload
});

export const createStockAdjustment = (payload) => ({
    type: CREATE_STOCK_ADJUSTMENT_START,
    payload
});

export const createStockAdjustmentSuccess = () => ({
    type: CREATE_STOCK_ADJUSTMENT_SUCCESS
});

export const createStockAdjustmentFailed = (payload) => ({
    type: CREATE_STOCK_ADJUSTMENT_FAILED,
    payload
});

export const updateStockAdjustment = (payload) => ({
    type: UPDATE_STOCK_ADJUSTMENT_START,
    payload
});

export const updateStockAdjustmentSuccess = () => ({
    type: UPDATE_STOCK_ADJUSTMENT_SUCCESS
});

export const updateStockAdjustmentFailed = (payload) => ({
    type: UPDATE_STOCK_ADJUSTMENT_FAILED,
    payload
});

export const destroyStockAdjustments = (payload) => ({
    type: DESTROY_STOCK_ADJUSTMENTS_START,
    payload
});

export const destroyStockAdjustmentsSuccess = (payload) => ({
    type: DESTROY_STOCK_ADJUSTMENTS_SUCCESS,
    payload
});

export const destroyStockAdjustmentsFailed = (payload) => ({
    type: DESTROY_STOCK_ADJUSTMENTS_FAILED,
    payload
});