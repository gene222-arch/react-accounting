import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

const {
    GET_BANK_ACCOUNT_TRANSFERS_START,
    GET_BANK_ACCOUNT_TRANSFERS_SUCCESS,
    GET_BANK_ACCOUNT_TRANSFERS_FAILED,

    CREATE_BANK_ACCOUNT_TRANSFER_START,
    CREATE_BANK_ACCOUNT_TRANSFER_SUCCESS,
    CREATE_BANK_ACCOUNT_TRANSFER_FAILED,

    UPDATE_BANK_ACCOUNT_TRANSFER_START,
    UPDATE_BANK_ACCOUNT_TRANSFER_SUCCESS,
    UPDATE_BANK_ACCOUNT_TRANSFER_FAILED,

    REVERSE_BANK_ACCOUNT_TRANSFERS_START,
    REVERSE_BANK_ACCOUNT_TRANSFERS_SUCCESS,
    REVERSE_BANK_ACCOUNT_TRANSFERS_FAILED,

    DESTROY_BANK_ACCOUNT_TRANSFERS_START,
    DESTROY_BANK_ACCOUNT_TRANSFERS_SUCCESS,
    DESTROY_BANK_ACCOUNT_TRANSFERS_FAILED
} = ACTION_TYPES;

const BANK_ACCOUNT_TRANSFER_DEFAULT_PROPS = {
    id: 0,
    from_account_id: 0,
    to_account_id: 0,
    amount: 0,
    transferred_at: DATE.today(),
    description: '',
    payment_method_id: '',
    reference: ''
};

const ERROR_DEFAULT= {
    from_account_id: '',
    to_account_id: '',
    amount: '',
    transferred_at: '',
    description: '',
    payment_method_id: '',
    reference: ''
};

const initialState = {
    isLoading: false,
    bankAccountTransfer: BANK_ACCOUNT_TRANSFER_DEFAULT_PROPS,
    bankAccountTransfers: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        bankAccountTransfers
    } = state;

    switch (type) 
    {
        case GET_BANK_ACCOUNT_TRANSFERS_START:
        case CREATE_BANK_ACCOUNT_TRANSFER_START:
        case UPDATE_BANK_ACCOUNT_TRANSFER_START:
        case REVERSE_BANK_ACCOUNT_TRANSFERS_START:
        case DESTROY_BANK_ACCOUNT_TRANSFERS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_BANK_ACCOUNT_TRANSFERS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                bankAccountTransfers: payload.bankAccountTransfers,
                error: ERROR_DEFAULT
            };

        case GET_BANK_ACCOUNT_TRANSFERS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_BANK_ACCOUNT_TRANSFER_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_BANK_ACCOUNT_TRANSFER_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_BANK_ACCOUNT_TRANSFER_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_BANK_ACCOUNT_TRANSFER_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
            
        case REVERSE_BANK_ACCOUNT_TRANSFERS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                bankAccountTransfers: bankAccountTransfers.filter(bankAccountTransfer => bankAccountTransfer.id !== payload.id) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_BANK_ACCOUNT_TRANSFERS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                bankAccountTransfers: bankAccountTransfers.filter(bankAccountTransfer => !payload.ids.includes(bankAccountTransfer.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_BANK_ACCOUNT_TRANSFERS_FAILED: 
        case REVERSE_BANK_ACCOUNT_TRANSFERS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
