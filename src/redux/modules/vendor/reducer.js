import ACTION_TYPES from './action.types';

const {
    GET_VENDORS_START,
    GET_VENDORS_SUCCESS,
    GET_VENDORS_FAILED,

    CREATE_VENDOR_START,
    CREATE_VENDOR_SUCCESS,
    CREATE_VENDOR_FAILED,

    UPDATE_VENDOR_START,
    UPDATE_VENDOR_SUCCESS,
    UPDATE_VENDOR_FAILED,

    DESTROY_VENDORS_START,
    DESTROY_VENDORS_SUCCESS,
    DESTROY_VENDORS_FAILED
} = ACTION_TYPES;

const VENDOR_DEFAULT_PROPS = {
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
    vendor: VENDOR_DEFAULT_PROPS,
    vendors: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        vendors
    } = state;

    switch (type) 
    {
        case GET_VENDORS_START:
        case CREATE_VENDOR_START:
        case UPDATE_VENDOR_START:
        case DESTROY_VENDORS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_VENDORS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                vendors: payload.vendors,
                error: ERROR_DEFAULT
            };

        case GET_VENDORS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_VENDOR_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_VENDOR_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_VENDOR_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_VENDOR_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_VENDORS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                vendors: vendors.filter(vendor => !payload.ids.includes(vendor.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_VENDORS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
