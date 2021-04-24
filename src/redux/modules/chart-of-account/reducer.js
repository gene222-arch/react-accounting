import ACTION_TYPES from './action.types';

const {
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

const CHART_OF_ACCOUNT_DEFAULT_PROPS = {
    id: 0,
    chart_of_account_type_id: 0,
    name: '',
    code: '',
    description: '',
    enabled: ''
}

const ERROR_DEFAULT_PROPS = {
    chart_of_account_type_id: 0,
    name: '',
    code: '',
    description: '',
    enabled: ''
};

const initialState = {
    isLoading: false,
    chartOfAccounts: [],
    chartOfAccount: CHART_OF_ACCOUNT_DEFAULT_PROPS,
    error: ERROR_DEFAULT_PROPS
}

export default (state = initialState, { type, payload }) => 
{
    const {
        isLoading,
        chartOfAccounts,
        chartOfAccount,
        error
    } = state;

    switch (type) {

    case CREATE_CHART_OF_ACCOUNT_START:
    case UPDATE_CHART_OF_ACCOUNT_START:
    case DESTROY_CHART_OF_ACCOUNTS_START:
    case GET_CHART_OF_ACCOUNTS_START:
        return { 
            ...state, 
            isLoading: true,
        };

    case GET_CHART_OF_ACCOUNTS_SUCCESS:
        return { 
            ...state, 
            isLoading: false,
            chartOfAccounts: payload.chartOfAccounts,
            error: ERROR_DEFAULT_PROPS,
        };
    
    case GET_CHART_OF_ACCOUNTS_FAILED:
        return { 
            ...state, 
            isLoading: false,
            error: payload.errorMessages
        };

    case CREATE_CHART_OF_ACCOUNT_SUCCESS:
        return {
            ...state,
            isLoading: false,
            error: ERROR_DEFAULT_PROPS
        };

    case CREATE_CHART_OF_ACCOUNT_FAILED:
        return {
            ...state,
            isLoading: false,
            error: payload.errorMessages
        };

    case UPDATE_CHART_OF_ACCOUNT_SUCCESS:
        return {
            ...state,
            isLoading: false,
            error: ERROR_DEFAULT_PROPS
        };
        
    case UPDATE_CHART_OF_ACCOUNT_FAILED:
        return {
            ...state,
            isLoading: false,
            error: payload.errorMessages
        };

    case DESTROY_CHART_OF_ACCOUNTS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            chartOfAccounts: chartOfAccounts.filter(chartOfAccount => !payload.ids.includes(chartOfAccount.id)),
            error: ERROR_DEFAULT_PROPS
        };
        
    case DESTROY_CHART_OF_ACCOUNTS_FAILED:
        return {
            ...state,
            isLoading: false,
            error: payload.errorMessages
        };

    default:
        return state
    }
}
