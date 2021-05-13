import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

const {
    GET_PAYMENTS_START,
    GET_PAYMENTS_SUCCESS,
    GET_PAYMENTS_FAILED,

    CREATE_PAYMENT_START,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILED,

    UPDATE_PAYMENT_START,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILED,

    DESTROY_PAYMENTS_START,
    DESTROY_PAYMENTS_SUCCESS,
    DESTROY_PAYMENTS_FAILED
} = ACTION_TYPES;

const PAYMENT_DEFAULT_PROPS = {
    id: 0,
    number: '',
    account_id: 0,
    vendor_id: 0,
    expense_category_id: 0,
    payment_method_id: 0,
    currency_id: 0,
    date: DATE.today(),
    amount: 0,
    description: '',
    recurring: '',
    reference: '',
    file: null
};

const ERROR_DEFAULT= {
    number: '',
    account_id: '',
    vendor_id: '',
    expense_category_id: '',
    payment_method_id: '',
    currency_id: '',
    date: '',
    amount: '',
    description: '',
    recurring: '',
    reference: '',
    file: null
};

const initialState = {
    isLoading: false,
    payment: PAYMENT_DEFAULT_PROPS,
    payments: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        payments
    } = state;

    switch (type) 
    {
        case GET_PAYMENTS_START:
        case CREATE_PAYMENT_START:
        case UPDATE_PAYMENT_START:
        case DESTROY_PAYMENTS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_PAYMENTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                payments: payload.payments,
                error: ERROR_DEFAULT
            };

        case GET_PAYMENTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_PAYMENT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_PAYMENT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_PAYMENT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_PAYMENT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_PAYMENTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                payments: payments.filter(({ id }) => !payload.ids.includes(id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_PAYMENTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
