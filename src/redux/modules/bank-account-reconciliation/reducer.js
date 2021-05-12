import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

const {
    GET_BANK_ACCOUNT_RECONCILIATIONS_START,
    GET_BANK_ACCOUNT_RECONCILIATIONS_SUCCESS,
    GET_BANK_ACCOUNT_RECONCILIATIONS_FAILED,

    CREATE_BANK_ACCOUNT_RECONCILIATION_START,
    CREATE_BANK_ACCOUNT_RECONCILIATION_SUCCESS,
    CREATE_BANK_ACCOUNT_RECONCILIATION_FAILED,

    UPDATE_BANK_ACCOUNT_RECONCILIATION_START,
    UPDATE_BANK_ACCOUNT_RECONCILIATION_SUCCESS,
    UPDATE_BANK_ACCOUNT_RECONCILIATION_FAILED,

    REVERSE_BANK_ACCOUNT_RECONCILIATIONS_START,
    REVERSE_BANK_ACCOUNT_RECONCILIATIONS_SUCCESS,
    REVERSE_BANK_ACCOUNT_RECONCILIATIONS_FAILED,

    DESTROY_BANK_ACCOUNT_RECONCILIATIONS_START,
    DESTROY_BANK_ACCOUNT_RECONCILIATIONS_SUCCESS,
    DESTROY_BANK_ACCOUNT_RECONCILIATIONS_FAILED
} = ACTION_TYPES;

const BANK_ACCOUNT_RECONCILIATION_DEFAULT_PROPS = {
    id: 0,
    account_id: 0,
    started_at: DATE.today(),
    ended_at: DATE.today(),
    closing_balance: 0,
    cleared_amount: 0,
    difference: 0,
    status: 'Unreconciled',
};

const ERROR_DEFAULT= {
    account_id: '',
    started_at: '',
    ended_at: '',
    closing_balance: '',
    cleared_amount: '',
    difference: '',
    status: ''
};

const initialState = {
    isLoading: false,
    bankAccountReconciliation: BANK_ACCOUNT_RECONCILIATION_DEFAULT_PROPS,
    bankAccountReconciliations: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        bankAccountReconciliations
    } = state;

    switch (type) 
    {
        case GET_BANK_ACCOUNT_RECONCILIATIONS_START:
        case CREATE_BANK_ACCOUNT_RECONCILIATION_START:
        case UPDATE_BANK_ACCOUNT_RECONCILIATION_START:
        case DESTROY_BANK_ACCOUNT_RECONCILIATIONS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_BANK_ACCOUNT_RECONCILIATIONS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                bankAccountReconciliations: payload.bankAccountReconciliations,
                error: ERROR_DEFAULT
            };

        case GET_BANK_ACCOUNT_RECONCILIATIONS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_BANK_ACCOUNT_RECONCILIATION_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_BANK_ACCOUNT_RECONCILIATION_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_BANK_ACCOUNT_RECONCILIATION_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_BANK_ACCOUNT_RECONCILIATION_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case DESTROY_BANK_ACCOUNT_RECONCILIATIONS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                bankAccountReconciliations: bankAccountReconciliations.filter(({ id }) => !payload.ids.includes(id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_BANK_ACCOUNT_RECONCILIATIONS_FAILED:  
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
