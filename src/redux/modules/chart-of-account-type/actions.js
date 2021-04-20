import ACTION_TYPES from './action.types';

const {
    GET_CHART_OF_ACCOUNT_TYPES_START,
    GET_CHART_OF_ACCOUNT_TYPES_SUCCESS,
    GET_CHART_OF_ACCOUNT_TYPES_FAILED,

} = ACTION_TYPES;

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