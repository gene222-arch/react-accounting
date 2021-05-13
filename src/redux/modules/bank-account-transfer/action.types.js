const ACTION_TYPES = 
{
    GET_BANK_ACCOUNT_TRANSFERS_START: 'GET_BANK_ACCOUNT_TRANSFERS_START',
    GET_BANK_ACCOUNT_TRANSFERS_SUCCESS: 'GET_BANK_ACCOUNT_TRANSFERS_SUCCESS',
    GET_BANK_ACCOUNT_TRANSFERS_FAILED: 'GET_BANK_ACCOUNT_TRANSFERS_FAILED',
    
    CREATE_BANK_ACCOUNT_TRANSFER_START: 'CREATE_BANK_ACCOUNT_TRANSFER_START',
    CREATE_BANK_ACCOUNT_TRANSFER_SUCCESS: 'CREATE_BANK_ACCOUNT_TRANSFER_SUCCESS',
    CREATE_BANK_ACCOUNT_TRANSFER_FAILED: 'CREATE_BANK_ACCOUNT_TRANSFER_FAILED',

    UPDATE_BANK_ACCOUNT_TRANSFER_START: 'UPDATE_BANK_ACCOUNT_TRANSFER_START',
    UPDATE_BANK_ACCOUNT_TRANSFER_SUCCESS: 'UPDATE_BANK_ACCOUNT_TRANSFER_SUCCESS',
    UPDATE_BANK_ACCOUNT_TRANSFER_FAILED: 'UPDATE_BANK_ACCOUNT_TRANSFER_FAILED',

    REVERSE_BANK_ACCOUNT_TRANSFERS_START: 'REVERSE_BANK_ACCOUNT_TRANSFERS_START',
    REVERSE_BANK_ACCOUNT_TRANSFERS_SUCCESS: 'REVERSE_BANK_ACCOUNT_TRANSFERS_SUCCESS',
    REVERSE_BANK_ACCOUNT_TRANSFERS_FAILED: 'REVERSE_BANK_ACCOUNT_TRANSFERS_FAILED',
    
    DESTROY_BANK_ACCOUNT_TRANSFERS_START: 'DESTROY_BANK_ACCOUNT_TRANSFERS_START',
    DESTROY_BANK_ACCOUNT_TRANSFERS_SUCCESS: 'DESTROY_BANK_ACCOUNT_TRANSFERS_SUCCESS',
    DESTROY_BANK_ACCOUNT_TRANSFERS_FAILED: 'DESTROY_BANK_ACCOUNT_TRANSFERS_FAILED',
};

export default ACTION_TYPES;