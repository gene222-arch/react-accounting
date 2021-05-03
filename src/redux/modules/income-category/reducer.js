import ACTION_TYPES from './action.types';

const {
    GET_INCOME_CATEGORIES_START,
    GET_INCOME_CATEGORIES_SUCCESS,
    GET_INCOME_CATEGORIES_FAILED,

    CREATE_INCOME_CATEGORY_START,
    CREATE_INCOME_CATEGORY_SUCCESS,
    CREATE_INCOME_CATEGORY_FAILED,

    UPDATE_INCOME_CATEGORY_START,
    UPDATE_INCOME_CATEGORY_SUCCESS,
    UPDATE_INCOME_CATEGORY_FAILED,

    DESTROY_INCOME_CATEGORIES_START,
    DESTROY_INCOME_CATEGORIES_SUCCESS,
    DESTROY_INCOME_CATEGORIES_FAILED
} = ACTION_TYPES;

const INCOME_CATEGORY_DEFAULT_PROPS = {
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
    incomeCategory: INCOME_CATEGORY_DEFAULT_PROPS,
    incomeCategories: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        incomeCategories
    } = state;

    switch (type) 
    {
        case GET_INCOME_CATEGORIES_START:
        case CREATE_INCOME_CATEGORY_START:
        case UPDATE_INCOME_CATEGORY_START:
        case DESTROY_INCOME_CATEGORIES_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_INCOME_CATEGORIES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                incomeCategories: payload.incomeCategories,
                error: ERROR_DEFAULT
            };

        case GET_INCOME_CATEGORIES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_INCOME_CATEGORY_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_INCOME_CATEGORY_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_INCOME_CATEGORY_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_INCOME_CATEGORY_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_INCOME_CATEGORIES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                incomeCategories: incomeCategories.filter(incomeCategory => !payload.ids.includes(incomeCategory.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_INCOME_CATEGORIES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
