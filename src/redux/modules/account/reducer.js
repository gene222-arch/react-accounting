import ACTION_TYPES from './action.types';

const {
    GET_ACCOUNTS_START,
    GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_FAILED,

    CREATE_ACCOUNT_START,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILED,

    UPDATE_ACCOUNT_START,
    UPDATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_FAILED,

    DESTROY_ACCOUNTS_START,
    DESTROY_ACCOUNTS_SUCCESS,
    DESTROY_ACCOUNTS_FAILED
} = ACTION_TYPES;

const ACCOUNT_DEFAULT_PROPS = {
    id: 0,
    currency_id: 0,
    name: '',
    number: 0,
    opening_balance: 0,
    balance: 0,
    bank_name: '',
    bank_phone: '',
    bank_address: '',
    enabled: false
};

const ERROR_DEFAULT= {
    currency_id: 0,
    name: '',
    number: 0,
    opening_balance: 0,
    balance: 0,
    bank_name: '',
    bank_phone: '',
    bank_address: '',
    enabled: false
};

const initialState = {
    isLoading: false,
    account: ACCOUNT_DEFAULT_PROPS,
    accounts: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        accounts
    } = state;

    switch (type) 
    {
        case GET_ACCOUNTS_START:
        case CREATE_ACCOUNT_START:
        case UPDATE_ACCOUNT_START:
        case DESTROY_ACCOUNTS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_ACCOUNTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                accounts: payload.accounts,
                error: ERROR_DEFAULT
            };

        case GET_ACCOUNTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_ACCOUNT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_ACCOUNT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_ACCOUNT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_ACCOUNT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_ACCOUNTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                accounts: accounts.filter(account => !payload.ids.includes(account.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_ACCOUNTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
