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

const CHART_OF_ACCOUNT_TYPE_DEFAULT = {
    id: 0,
    name: '',
    category: '',
    description: ''
}

const ERROR_DEFAULT = {
    category: '',
    name: '',
    description: ''
};

const initialState = {
    isLoading: false,
    chartOfAccountTypes: [],
    chartOfAccountType: CHART_OF_ACCOUNT_TYPE_DEFAULT,
    error: ERROR_DEFAULT
}

export default (state = initialState, { type, payload }) => 
{
    const {
        isLoading,
        chartOfAccountTypes,
        chartOfAccountType,
        error
    } = state;

    switch (type) {

    case CREATE_CHART_OF_ACCOUNT_TYPE_START:
    case UPDATE_CHART_OF_ACCOUNT_TYPE_START:
    case DESTROY_CHART_OF_ACCOUNT_TYPES_START:
    case GET_CHART_OF_ACCOUNT_TYPES_START:
        return { 
            ...state, 
            isLoading: true,
        };

    case GET_CHART_OF_ACCOUNT_TYPES_SUCCESS:
        return { 
            ...state, 
            isLoading: false,
            chartOfAccountTypes: payload.chartOfAccountTypes,
            error: ERROR_DEFAULT,
        };
    
    case GET_CHART_OF_ACCOUNT_TYPES_FAILED:
        return { 
            ...state, 
            isLoading: false,
            error: payload.errorMessages
        };

    case CREATE_CHART_OF_ACCOUNT_TYPE_SUCCESS:
        return {
            ...state,
            isLoading: false,
            error: ERROR_DEFAULT
        };

    case CREATE_CHART_OF_ACCOUNT_TYPE_FAILED:
        return {
            ...state,
            isLoading: false,
            error: payload.errorMessages
        };

    case UPDATE_CHART_OF_ACCOUNT_TYPE_SUCCESS:
        return {
            ...state,
            isLoading: false,
            error: ERROR_DEFAULT
        };
        
    case UPDATE_CHART_OF_ACCOUNT_TYPE_FAILED:
        return {
            ...state,
            isLoading: false,
            error: payload.errorMessages
        };

    case DESTROY_CHART_OF_ACCOUNT_TYPES_SUCCESS:
        return {
            ...state,
            isLoading: false,
            chartOfAccountTypes: chartOfAccountTypes.filter(chartOfAccountType => !payload.ids.includes(chartOfAccountType.id)),
            error: ERROR_DEFAULT
        };
        
    case DESTROY_CHART_OF_ACCOUNT_TYPES_FAILED:
        return {
            ...state,
            isLoading: false,
            error: payload.errorMessages
        };

    default:
        return state
    }
}
