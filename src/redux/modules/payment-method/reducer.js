import ACTION_TYPES from './action.types';

const {
    GET_PAYMENT_METHODS_START,
    GET_PAYMENT_METHODS_SUCCESS,
    GET_PAYMENT_METHODS_FAILED,

    CREATE_PAYMENT_METHOD_START,
    CREATE_PAYMENT_METHOD_SUCCESS,
    CREATE_PAYMENT_METHOD_FAILED,

    UPDATE_PAYMENT_METHOD_START,
    UPDATE_PAYMENT_METHOD_SUCCESS,
    UPDATE_PAYMENT_METHOD_FAILED,

    DESTROY_PAYMENT_METHODS_START,
    DESTROY_PAYMENT_METHODS_SUCCESS,
    DESTROY_PAYMENT_METHODS_FAILED
} = ACTION_TYPES;

const PAYMENT_METHOD_DEFAULT_PROPS = {
    id: 0,
    name: '',
    enabled: false
};

const ERROR_DEFAULT= {
    name: '',
    enabled: false
};

const initialState = {
    isLoading: false,
    paymentMethod: PAYMENT_METHOD_DEFAULT_PROPS,
    paymentMethods: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        paymentMethods
    } = state;

    switch (type) 
    {
        case GET_PAYMENT_METHODS_START:
        case CREATE_PAYMENT_METHOD_START:
        case UPDATE_PAYMENT_METHOD_START:
        case DESTROY_PAYMENT_METHODS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_PAYMENT_METHODS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                paymentMethods: payload.paymentMethods,
                error: ERROR_DEFAULT
            };

        case GET_PAYMENT_METHODS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_PAYMENT_METHOD_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_PAYMENT_METHOD_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_PAYMENT_METHOD_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_PAYMENT_METHOD_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_PAYMENT_METHODS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                paymentMethods: paymentMethods.filter(paymentMethod => !payload.ids.includes(paymentMethod.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_PAYMENT_METHODS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
