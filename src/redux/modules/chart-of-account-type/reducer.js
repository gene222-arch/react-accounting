import ACTION_TYPES from './action.types';

const {
    GET_CHART_OF_ACCOUNT_TYPES_START,
    GET_CHART_OF_ACCOUNT_TYPES_SUCCESS,
    GET_CHART_OF_ACCOUNT_TYPES_FAILED,

} = ACTION_TYPES;

const ERROR_DEFAULT = {
    category: '',
    name: ''
};

const initialState = {
    isLoading: false,
    chartOfAccountTypes: [],
    category: '',
    name: '',
    error: ERROR_DEFAULT
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

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

    default:
        return state
    }
}
