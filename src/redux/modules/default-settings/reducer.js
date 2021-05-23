import ACTION_TYPES from './action.types';

const {
    GET_DEFAULT_SETTINGS_START,
    GET_DEFAULT_SETTINGS_SUCCESS,
    GET_DEFAULT_SETTINGS_FAILED,

    UPDATE_DEFAULT_SETTINGS_START,
    UPDATE_DEFAULT_SETTINGS_SUCCESS,
    UPDATE_DEFAULT_SETTINGS_FAILED,
} = ACTION_TYPES;

const DEFAULT_SETTINGS_DEFAULT_PROPS = {
    id: 0,
    account_id: 1,
    currency_id: 1,
    income_category_id: 1,
    expense_category_id: 1,
    tax_id: 1,
    payment_method_id: 1
};

const ERROR_DEFAULT = {
    account_id: '',
    currency_id: '',
    income_category_id: '',
    expense_category_id: '',
    tax_id: '',
    payment_method_id: ''
};

const initialState = {
    isLoading: false,
    defaultSettings: DEFAULT_SETTINGS_DEFAULT_PROPS,
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    switch (type) 
    {
        case GET_DEFAULT_SETTINGS_START:
        case UPDATE_DEFAULT_SETTINGS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_DEFAULT_SETTINGS_SUCCESS:
            return {
                defaultSettings: payload.defaultSettings,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case GET_DEFAULT_SETTINGS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_DEFAULT_SETTINGS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_DEFAULT_SETTINGS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_DEFAULT_SETTINGS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            
                   
        default:
            return state;
    }
}
