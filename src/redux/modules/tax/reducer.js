import ACTION_TYPES from './action.types';

const {
    GET_TAXES_START,
    GET_TAXES_SUCCESS,
    GET_TAXES_FAILED,

    CREATE_TAX_START,
    CREATE_TAX_SUCCESS,
    CREATE_TAX_FAILED,

    UPDATE_TAX_START,
    UPDATE_TAX_SUCCESS,
    UPDATE_TAX_FAILED,

    DESTROY_TAXES_START,
    DESTROY_TAXES_SUCCESS,
    DESTROY_TAXES_FAILED
} = ACTION_TYPES;

const TAX_DEFAULT_PROPS = {
    id: 0,
    name: '',
    rate: 0,
    type: '',
    enabled: false
};

const ERROR_DEFAULT= {
    name: '',
    rate: '',
    type: '',
    enabled: ''
};

const initialState = {
    isLoading: false,
    tax: TAX_DEFAULT_PROPS,
    taxes: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        taxes
    } = state;

    switch (type) 
    {
        case GET_TAXES_START:
        case CREATE_TAX_START:
        case UPDATE_TAX_START:
        case DESTROY_TAXES_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_TAXES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                taxes: payload.taxes,
                error: ERROR_DEFAULT
            };

        case GET_TAXES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_TAX_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_TAX_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_TAX_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_TAX_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_TAXES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                taxes: taxes.filter(tax => !payload.ids.includes(tax.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_TAXES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
