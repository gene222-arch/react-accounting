import ACTION_TYPES from './action.types';

const {
    GET_CURRENCIES_START,
    GET_CURRENCIES_SUCCESS,
    GET_CURRENCIES_FAILED,

    CREATE_CURRENCY_START,
    CREATE_CURRENCY_SUCCESS,
    CREATE_CURRENCY_FAILED,

    UPDATE_CURRENCY_START,
    UPDATE_CURRENCY_SUCCESS,
    UPDATE_CURRENCY_FAILED,

    DESTROY_CURRENCIES_START,
    DESTROY_CURRENCIES_SUCCESS,
    DESTROY_CURRENCIES_FAILED
} = ACTION_TYPES;

const CURRENCY_DEFAULT_PROPS = {
    id: 0,
    name: '',
    rate: 0,
    code: '',
    enabled: false
};

const ERROR_DEFAULT= {
    name: '',
    rate: '',
    code: '',
    enabled: ''
};

const initialState = {
    isLoading: false,
    currency: CURRENCY_DEFAULT_PROPS,
    currencies: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        currencies
    } = state;

    switch (type) 
    {
        case GET_CURRENCIES_START:
        case CREATE_CURRENCY_START:
        case UPDATE_CURRENCY_START:
        case DESTROY_CURRENCIES_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_CURRENCIES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                currencies: payload.currencies,
                error: ERROR_DEFAULT
            };

        case GET_CURRENCIES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_CURRENCY_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_CURRENCY_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_CURRENCY_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_CURRENCY_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_CURRENCIES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                currencies: currencies.filter(currency => !payload.ids.includes(currency.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_CURRENCIES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
