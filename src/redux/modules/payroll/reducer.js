import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

const {
    GET_PAYROLLS_START,
    GET_PAYROLLS_SUCCESS,
    GET_PAYROLLS_FAILED,

    CREATE_PAYROLL_START,
    CREATE_PAYROLL_SUCCESS,
    CREATE_PAYROLL_FAILED,
    
    APPROVE_PAYROLL_START,
    APPROVE_PAYROLL_SUCCESS,
    APPROVE_PAYROLL_FAILED,

    UPDATE_PAYROLL_START,
    UPDATE_PAYROLL_SUCCESS,
    UPDATE_PAYROLL_FAILED,

    DESTROY_PAYROLLS_START,
    DESTROY_PAYROLLS_SUCCESS,
    DESTROY_PAYROLLS_FAILED
} = ACTION_TYPES;


const PAYROLL_DEFAULT_PROPS = {
    id: 0,
    name: '',
    account_id: '',
    expense_category_id: '',
    payment_method_id: '',
    from_date: DATE.today(),
    to_date: DATE.today(),
    payment_date: DATE.today(),
    status: '',
    details: [],
    taxes: [],
    benefits: [],
    contributions: []
};

const ERROR_DEFAULT = { 
    name: '',
    account_id: '',
    expense_category_id: '',
    payment_method_id: '',
    from_date: '',
    to_date: '',
    payment_date: '',
    status: '',
};

const initialState = {
    payroll: PAYROLL_DEFAULT_PROPS,
    payrolls: [],
    isLoading: false,
    error: ERROR_DEFAULT
}

export default (state = initialState, { type, payload }) => 
{
    const {
        payrolls
    } = state;

    switch (type) 
    {
        case GET_PAYROLLS_START:
        case CREATE_PAYROLL_START:
        case APPROVE_PAYROLL_START:
        case UPDATE_PAYROLL_START:
        case DESTROY_PAYROLLS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_PAYROLLS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                payrolls: payload.payrolls,
                error: ERROR_DEFAULT
            };

        case GET_PAYROLLS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_PAYROLL_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_PAYROLL_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case APPROVE_PAYROLL_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case APPROVE_PAYROLL_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  

        case UPDATE_PAYROLL_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_PAYROLL_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_PAYROLLS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                payrolls: payrolls.filter(({ id }) => !payload.ids.includes(id)),
                error: ERROR_DEFAULT
            };

        case DESTROY_PAYROLLS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
