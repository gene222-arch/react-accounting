import ACTION_TYPES from './action.types';

const {
    GET_DISCOUNTS_START,
    GET_DISCOUNTS_SUCCESS,
    GET_DISCOUNTS_FAILED,

    CREATE_DISCOUNT_START,
    CREATE_DISCOUNT_SUCCESS,
    CREATE_DISCOUNT_FAILED,

    UPDATE_DISCOUNT_START,
    UPDATE_DISCOUNT_SUCCESS,
    UPDATE_DISCOUNT_FAILED,

    DESTROY_DISCOUNTS_START,
    DESTROY_DISCOUNTS_SUCCESS,
    DESTROY_DISCOUNTS_FAILED
} = ACTION_TYPES;

const DISCOUNT_DEFAULT_PROPS = {
    id: 0,
    name: '',
    rate: '',
    enabled: false
};

const ERROR_DEFAULT= {
    name: '',
    rate: '',
    enabled: false
};

const initialState = {
    isLoading: false,
    discount: DISCOUNT_DEFAULT_PROPS,
    discounts: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        discounts
    } = state;

    switch (type) 
    {
        case GET_DISCOUNTS_START:
        case CREATE_DISCOUNT_START:
        case UPDATE_DISCOUNT_START:
        case DESTROY_DISCOUNTS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_DISCOUNTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                discounts: payload.discounts,
                error: ERROR_DEFAULT
            };

        case GET_DISCOUNTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_DISCOUNT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_DISCOUNT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_DISCOUNT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_DISCOUNT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_DISCOUNTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                discounts: discounts.filter(discount => !payload.ids.includes(discount.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_DISCOUNTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
