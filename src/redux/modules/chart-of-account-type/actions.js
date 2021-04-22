import ACTION_TYPES from './action.types';

const {
    GET_CHART_OF_ACCOUNT_TYPES_START,
    GET_CHART_OF_ACCOUNT_TYPES_SUCCESS,
    GET_CHART_OF_ACCOUNT_TYPES_FAILED,

    CREATE_CHART_OF_ACCOUNT_TYPE_START,
    CREATE_CHART_OF_ACCOUNT_TYPE_SUCCESS,
    CREATE_CHART_OF_ACCOUNT_TYPE_FAILED,

    UPDATE_CHART_OF_ACCOUNT_TYPE_START,
    UPDATE_CHART_OF_ACCOUNT_TYPE_SUCCESS,
    UPDATE_CHART_OF_ACCOUNT_TYPE_FAILED,

    DESTROY_CHART_OF_ACCOUNT_TYPES_START,
    DESTROY_CHART_OF_ACCOUNT_TYPES_SUCCESS,
    DESTROY_CHART_OF_ACCOUNT_TYPES_FAILED
} = ACTION_TYPES;

/**
 * Fetching records
 */
export const getChartOfAccountTypes = () => ({
    type: GET_CHART_OF_ACCOUNT_TYPES_START
});

export const getChartOfAccountTypesSuccess = (payload) => ({
    type: GET_CHART_OF_ACCOUNT_TYPES_SUCCESS,
    payload
});

export const getChartOfAccountTypesFailed = (payload) => ({
    type: GET_CHART_OF_ACCOUNT_TYPES_FAILED,
    payload
});

/**
 * Create a new record
 */

export const createChartOfAccountType = (payload) => ({
    type: CREATE_CHART_OF_ACCOUNT_TYPE_START,
    payload
});

export const createChartOfAccountTypeSuccess = (payload) => ({
    type: CREATE_CHART_OF_ACCOUNT_TYPE_SUCCESS,
    payload
});

export const createChartOfAccountTypeFailed = (payload) => ({
    type: CREATE_CHART_OF_ACCOUNT_TYPE_FAILED,
    payload
});

/**
 * Update an existing record
 */

export const updateChartOfAccountType = (payload) => ({
    type: UPDATE_CHART_OF_ACCOUNT_TYPE_START,
    payload
});

export const updateChartOfAccountTypeSuccess = (payload) => ({
    type: UPDATE_CHART_OF_ACCOUNT_TYPE_SUCCESS,
    payload
});

export const updateChartOfAccountTypeFailed = (payload) => ({
    type: UPDATE_CHART_OF_ACCOUNT_TYPE_FAILED,
    payload
});

/**
 * Delete one or multiple records
 */

export const destroyChartOfAccountTypes = (payload) => ({
    type: DESTROY_CHART_OF_ACCOUNT_TYPES_START,
    payload
});

export const destroyChartOfAccountTypesSuccess = (payload) => ({
    type: DESTROY_CHART_OF_ACCOUNT_TYPES_SUCCESS,
    payload
});

export const destroyChartOfAccountTypesFailed = (payload) => ({
    type: DESTROY_CHART_OF_ACCOUNT_TYPES_FAILED,
    payload
});