import ACTION_TYPES from './action.types';

const {
    GET_CATEGORIES_START,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILED,

    CREATE_CATEGORY_START,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILED,

    UPDATE_CATEGORY_START,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILED,

    DESTROY_CATEGORIES_START,
    DESTROY_CATEGORIES_SUCCESS,
    DESTROY_CATEGORIES_FAILED
} = ACTION_TYPES;

const CATEGORY_DEFAULT_PROPS = {
    id: 0,
    name: '',
    hex_code: '',
    enabled: false
};

const ERROR_DEFAULT= {
    name: '',
    hex_code: '',
    enabled: false
};

const initialState = {
    isLoading: false,
    category: CATEGORY_DEFAULT_PROPS,
    categories: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        categories
    } = state;

    switch (type) 
    {
        case GET_CATEGORIES_START:
        case CREATE_CATEGORY_START:
        case UPDATE_CATEGORY_START:
        case DESTROY_CATEGORIES_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_CATEGORIES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                categories: payload.categories,
                error: ERROR_DEFAULT
            };

        case GET_CATEGORIES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_CATEGORY_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_CATEGORY_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_CATEGORY_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_CATEGORY_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_CATEGORIES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                categories: categories.filter(category => !payload.ids.includes(category.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_CATEGORIES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
