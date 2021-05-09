import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

const {
    GET_REVENUES_START,
    GET_REVENUES_SUCCESS,
    GET_REVENUES_FAILED,

    CREATE_REVENUE_START,
    CREATE_REVENUE_SUCCESS,
    CREATE_REVENUE_FAILED,

    UPDATE_REVENUE_START,
    UPDATE_REVENUE_SUCCESS,
    UPDATE_REVENUE_FAILED,

    DESTROY_REVENUES_START,
    DESTROY_REVENUES_SUCCESS,
    DESTROY_REVENUES_FAILED
} = ACTION_TYPES;

const REVENUE_DEFAULT_PROPS = {
    id: 0,
    number: '',
    account_id: 0,
    customer_id: 0,
    income_revenue_id: 0,
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
    account_id: 0,
    customer_id: 0,
    income_revenue_id: 0,
    payment_method_id: 0,
    currency_id: 0,
    date: DATE.today(),
    amount: 0,
    description: '',
    recurring: '',
    reference: '',
    file: null
};

const initialState = {
    isLoading: false,
    revenue: REVENUE_DEFAULT_PROPS,
    revenues: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        revenues
    } = state;

    switch (type) 
    {
        case GET_REVENUES_START:
        case CREATE_REVENUE_START:
        case UPDATE_REVENUE_START:
        case DESTROY_REVENUES_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_REVENUES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                revenues: payload.revenues,
                error: ERROR_DEFAULT
            };

        case GET_REVENUES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_REVENUE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_REVENUE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_REVENUE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_REVENUE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_REVENUES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                revenues: revenues.filter(revenue => !payload.ids.includes(revenue.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_REVENUES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
