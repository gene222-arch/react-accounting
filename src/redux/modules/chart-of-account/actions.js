import ACTION_TYPES from './action.types';

const 
{
    GET_CHART_OF_ACCOUNTS_START,
    GET_CHART_OF_ACCOUNTS_SUCCESS,
    GET_CHART_OF_ACCOUNTS_FAILED,

    CREATE_CHART_OF_ACCOUNT_START,
    CREATE_CHART_OF_ACCOUNT_SUCCESS,
    CREATE_CHART_OF_ACCOUNT_FAILED,

    UPDATE_CHART_OF_ACCOUNT_START,
    UPDATE_CHART_OF_ACCOUNT_SUCCESS,
    UPDATE_CHART_OF_ACCOUNT_FAILED,

    DESTROY_CHART_OF_ACCOUNTS_START,
    DESTROY_CHART_OF_ACCOUNTS_SUCCESS,
    DESTROY_CHART_OF_ACCOUNTS_FAILED
} = ACTION_TYPES;

/**
 * Fetching records
 */
export const getChartOfAccounts = () => ({
   type: GET_CHART_OF_ACCOUNTS_START
});

export const getChartOfAccountsSuccess = (payload) => ({
   type: GET_CHART_OF_ACCOUNTS_SUCCESS,
   payload
});

export const getChartOfAccountsFailed = (payload) => ({
   type: GET_CHART_OF_ACCOUNTS_FAILED,
   payload
});

/**
* Create a new record
*/

export const createChartOfAccount = (payload) => ({
   type: CREATE_CHART_OF_ACCOUNT_START,
   payload
});

export const createChartOfAccountSuccess = (payload) => ({
   type: CREATE_CHART_OF_ACCOUNT_SUCCESS,
   payload
});

export const createChartOfAccountFailed = (payload) => ({
   type: CREATE_CHART_OF_ACCOUNT_FAILED,
   payload
});

/**
* Update an existing record
*/

export const updateChartOfAccount = (payload) => ({
   type: UPDATE_CHART_OF_ACCOUNT_START,
   payload
});

export const updateChartOfAccountSuccess = (payload) => ({
   type: UPDATE_CHART_OF_ACCOUNT_SUCCESS,
   payload
});

export const updateChartOfAccountFailed = (payload) => ({
   type: UPDATE_CHART_OF_ACCOUNT_FAILED,
   payload
});

/**
* Delete one or multiple records
*/

export const destroyChartOfAccounts = (payload) => ({
   type: DESTROY_CHART_OF_ACCOUNTS_START,
   payload
});

export const destroyChartOfAccountsSuccess = (payload) => ({
   type: DESTROY_CHART_OF_ACCOUNTS_SUCCESS,
   payload
});

export const destroyChartOfAccountsFailed = (payload) => ({
   type: DESTROY_CHART_OF_ACCOUNTS_FAILED,
   payload
});