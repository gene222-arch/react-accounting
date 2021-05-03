import ACTION_TYPES from './action.types';

const {
    GET_EXPENSE_CATEGORIES_START,
    GET_EXPENSE_CATEGORIES_SUCCESS,
    GET_EXPENSE_CATEGORIES_FAILED,

    CREATE_EXPENSE_CATEGORY_START,
    CREATE_EXPENSE_CATEGORY_SUCCESS,
    CREATE_EXPENSE_CATEGORY_FAILED,

    UPDATE_EXPENSE_CATEGORY_START,
    UPDATE_EXPENSE_CATEGORY_SUCCESS,
    UPDATE_EXPENSE_CATEGORY_FAILED,

    DESTROY_EXPENSE_CATEGORIES_START,
    DESTROY_EXPENSE_CATEGORIES_SUCCESS,
    DESTROY_EXPENSE_CATEGORIES_FAILED
} = ACTION_TYPES;

const EXPENSE_CATEGORY_DEFAULT_PROPS = {
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
    expenseCategory: EXPENSE_CATEGORY_DEFAULT_PROPS,
    expenseCategories: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        expenseCategories
    } = state;

    switch (type) 
    {
        case GET_EXPENSE_CATEGORIES_START:
        case CREATE_EXPENSE_CATEGORY_START:
        case UPDATE_EXPENSE_CATEGORY_START:
        case DESTROY_EXPENSE_CATEGORIES_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_EXPENSE_CATEGORIES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                expenseCategories: payload.expenseCategories,
                error: ERROR_DEFAULT
            };

        case GET_EXPENSE_CATEGORIES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_EXPENSE_CATEGORY_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_EXPENSE_CATEGORY_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_EXPENSE_CATEGORY_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_EXPENSE_CATEGORY_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_EXPENSE_CATEGORIES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                expenseCategories: expenseCategories.filter(expenseCategory => !payload.ids.includes(expenseCategory.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_EXPENSE_CATEGORIES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
