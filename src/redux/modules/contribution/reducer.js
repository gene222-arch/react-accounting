import ACTION_TYPES from './action.types';

const {
    GET_CONTRIBUTIONS_START,
    GET_CONTRIBUTIONS_SUCCESS,
    GET_CONTRIBUTIONS_FAILED,

    CREATE_CONTRIBUTION_START,
    CREATE_CONTRIBUTION_SUCCESS,
    CREATE_CONTRIBUTION_FAILED,

    UPDATE_CONTRIBUTION_START,
    UPDATE_CONTRIBUTION_SUCCESS,
    UPDATE_CONTRIBUTION_FAILED,

    DESTROY_CONTRIBUTIONS_START,
    DESTROY_CONTRIBUTIONS_SUCCESS,
    DESTROY_CONTRIBUTIONS_FAILED
} = ACTION_TYPES;

const CONTRIBUTION_DEFAULT_PROPS = {
    id: 0,
    name: '',
    rate: 0,
    enabled: false
};

const ERROR_DEFAULT= {
    name: '',
    rate: '',
    enabled: ''
};

const initialState = {
    isLoading: false,
    contribution: CONTRIBUTION_DEFAULT_PROPS,
    contributions: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        contributions
    } = state;

    switch (type) 
    {
        case GET_CONTRIBUTIONS_START:
        case CREATE_CONTRIBUTION_START:
        case UPDATE_CONTRIBUTION_START:
        case DESTROY_CONTRIBUTIONS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_CONTRIBUTIONS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                contributions: payload.contributions,
                error: ERROR_DEFAULT
            };

        case GET_CONTRIBUTIONS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_CONTRIBUTION_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_CONTRIBUTION_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_CONTRIBUTION_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_CONTRIBUTION_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_CONTRIBUTIONS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                contributions: contributions.filter(({ id }) => !payload.ids.includes(id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_CONTRIBUTIONS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
