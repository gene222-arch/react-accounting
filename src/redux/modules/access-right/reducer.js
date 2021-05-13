import ACTION_TYPES from './action.types';

const {
    GET_ACCESS_RIGHTS_START,
    GET_ACCESS_RIGHTS_SUCCESS,
    GET_ACCESS_RIGHTS_FAILED,

    CREATE_ACCESS_RIGHT_START,
    CREATE_ACCESS_RIGHT_SUCCESS,
    CREATE_ACCESS_RIGHT_FAILED,

    UPDATE_ACCESS_RIGHT_START,
    UPDATE_ACCESS_RIGHT_SUCCESS,
    UPDATE_ACCESS_RIGHT_FAILED,

    DESTROY_ACCESS_RIGHTS_START,
    DESTROY_ACCESS_RIGHTS_SUCCESS,
    DESTROY_ACCESS_RIGHTS_FAILED
} = ACTION_TYPES;

const ACCESS_RIGHT_DEFAULT_PROPS = {
    id: 0,
    role: '',
    enabled: false
};

const ERROR_DEFAULT= {
    role: '',
    enabled: ''
};

const initialState = {
    isLoading: false,
    accessRight: ACCESS_RIGHT_DEFAULT_PROPS,
    accessRights: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        accessRights
    } = state;

    switch (type) 
    {
        case GET_ACCESS_RIGHTS_START:
        case CREATE_ACCESS_RIGHT_START:
        case UPDATE_ACCESS_RIGHT_START:
        case DESTROY_ACCESS_RIGHTS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_ACCESS_RIGHTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                accessRights: payload.accessRights,
                error: ERROR_DEFAULT
            };

        case GET_ACCESS_RIGHTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_ACCESS_RIGHT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_ACCESS_RIGHT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_ACCESS_RIGHT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_ACCESS_RIGHT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_ACCESS_RIGHTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                accessRights: accessRights.filter(({ id }) => !payload.ids.includes(id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_ACCESS_RIGHTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
