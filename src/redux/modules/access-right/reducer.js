import ACTION_TYPES from './action.types';

const {

    GET_PERMISSIONS_START,
    GET_PERMISSIONS_SUCCESS,
    GET_PERMISSIONS_FAILED,

    GET_ROLES_START,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAILED,

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
    permissions: [],
    enabled: false
};

const ERROR_DEFAULT= {
    role: '',
    permissions: [],
    enabled: false
};

const initialState = {
    isLoading: false,
    accessRight: ACCESS_RIGHT_DEFAULT_PROPS,
    accessRights: [],
    roles: [],
    permissions: {},
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        accessRights
    } = state;

    switch (type) 
    {
        case GET_PERMISSIONS_START:
        case GET_ROLES_START:
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

        case GET_PERMISSIONS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                permissions: payload.permissions,
                error: ERROR_DEFAULT
            };

        case GET_PERMISSIONS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case GET_ROLES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                roles: payload.roles,
                error: ERROR_DEFAULT
            };

        case GET_ROLES_FAILED: 
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
