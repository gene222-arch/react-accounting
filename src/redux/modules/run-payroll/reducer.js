import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

const {
    GET_RUN_PAYROLLS_START,
    GET_RUN_PAYROLLS_SUCCESS,
    GET_RUN_PAYROLLS_FAILED,

    CREATE_RUN_PAYROLL_START,
    CREATE_RUN_PAYROLL_SUCCESS,
    CREATE_RUN_PAYROLL_FAILED,
    
    APPROVE_RUN_PAYROLL_START,
    APPROVE_RUN_PAYROLL_SUCCESS,
    APPROVE_RUN_PAYROLL_FAILED,

    UPDATE_RUN_PAYROLL_START,
    UPDATE_RUN_PAYROLL_SUCCESS,
    UPDATE_RUN_PAYROLL_FAILED,

    DESTROY_RUN_PAYROLLS_START,
    DESTROY_RUN_PAYROLLS_SUCCESS,
    DESTROY_RUN_PAYROLLS_FAILED
} = ACTION_TYPES;


const RUN_PAYROLL_DEFAULT_PROPS = {
    id: 0,
    name: 'PR-00001',
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
    runPayroll: RUN_PAYROLL_DEFAULT_PROPS,
    runPayrolls: [],
    isLoading: false,
    error: ERROR_DEFAULT
}

export default (state = initialState, { type, payload }) => 
{
    const {
        runPayrolls
    } = state;

    switch (type) 
    {
        case GET_RUN_PAYROLLS_START:
        case CREATE_RUN_PAYROLL_START:
        case APPROVE_RUN_PAYROLL_START:
        case UPDATE_RUN_PAYROLL_START:
        case DESTROY_RUN_PAYROLLS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_RUN_PAYROLLS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                runPayrolls: payload.runPayrolls,
                error: ERROR_DEFAULT
            };

        case GET_RUN_PAYROLLS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_RUN_PAYROLL_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_RUN_PAYROLL_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case APPROVE_RUN_PAYROLL_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                runPayrolls: runPayrolls.map(({ id, ...runPayroll }) => {
                    return id === payload.id
                        ? {
                            ...runPayroll,
                            id,
                            status: 'Approved'
                        }
                        : {
                            ...runPayroll,
                            id,
                        }
                }),
                error: ERROR_DEFAULT
            };

        case APPROVE_RUN_PAYROLL_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  

        case UPDATE_RUN_PAYROLL_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_RUN_PAYROLL_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_RUN_PAYROLLS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                runPayrolls: runPayrolls.filter(({ id }) => !payload.ids.includes(id)),
                error: ERROR_DEFAULT
            };

        case DESTROY_RUN_PAYROLLS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
