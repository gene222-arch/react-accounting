import ACTION_TYPES from './action.types';

const {
    GET_CUSTOMERS_START,
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_FAILED,

    CREATE_CUSTOMER_START,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_FAILED,

    UPDATE_CUSTOMER_START,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAILED,

    DESTROY_CUSTOMERS_START,
    DESTROY_CUSTOMERS_SUCCESS,
    DESTROY_CUSTOMERS_FAILED
} = ACTION_TYPES;

const CUSTOMER_DEFAULT_PROPS = {
    id: 0,
    currency_id: 0,
    name: '',
    email: '',
    tax_number: '',
    phone: '',
    website: '',
    address: '',
    reference: '',
    image: null,
    enabled: false
};

const ERROR_DEFAULT= {
    currency_id: 0,
    name: '',
    email: '',
    tax_number: '',
    phone: '',
    website: '',
    address: '',
    reference: '',
    image: null,
    enabled: false
};

const initialState = {
    isLoading: false,
    customer: CUSTOMER_DEFAULT_PROPS,
    customers: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        customers
    } = state;

    switch (type) 
    {
        case GET_CUSTOMERS_START:
        case CREATE_CUSTOMER_START:
        case UPDATE_CUSTOMER_START:
        case DESTROY_CUSTOMERS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_CUSTOMERS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                customers: payload.customers,
                error: ERROR_DEFAULT
            };

        case GET_CUSTOMERS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_CUSTOMER_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_CUSTOMER_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_CUSTOMER_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_CUSTOMER_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_CUSTOMERS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                customers: customers.filter(customer => !payload.ids.includes(customer.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_CUSTOMERS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
