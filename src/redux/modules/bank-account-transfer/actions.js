import ACTION_TYPES from './action.types';

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


export const getBankAccountTransfers = () => ({
    type: GET_BANK_ACCOUNT_TRANSFERS_START
});

export const getBankAccountTransfersSuccess = (payload) => ({
    type: GET_BANK_ACCOUNT_TRANSFERS_SUCCESS,
    payload
});

export const getBankAccountTransfersFailed = (payload) => ({
    type: GET_BANK_ACCOUNT_TRANSFERS_FAILED,
    payload
});

export const createBankAccountTransfer = (payload) => ({
    type: CREATE_BANK_ACCOUNT_TRANSFER_START,
    payload
});

export const createBankAccountTransferSuccess = () => ({
    type: CREATE_BANK_ACCOUNT_TRANSFER_SUCCESS
});

export const createBankAccountTransferFailed = (payload) => ({
    type: CREATE_BANK_ACCOUNT_TRANSFER_FAILED,
    payload
});

export const updateBankAccountTransfer = (payload) => ({
    type: UPDATE_BANK_ACCOUNT_TRANSFER_START,
    payload
});

export const updateBankAccountTransferSuccess = () => ({
    type: UPDATE_BANK_ACCOUNT_TRANSFER_SUCCESS
});

export const updateBankAccountTransferFailed = (payload) => ({
    type: UPDATE_BANK_ACCOUNT_TRANSFER_FAILED,
    payload
});

export const reverseBankAccountTransfers = (payload) => ({
    type: REVERSE_BANK_ACCOUNT_TRANSFERS_START,
    payload
});

export const reverseBankAccountTransfersSuccess = (payload) => ({
    type: REVERSE_BANK_ACCOUNT_TRANSFERS_SUCCESS,
    payload
});

export const reverseBankAccountTransfersFailed = (payload) => ({
    type: REVERSE_BANK_ACCOUNT_TRANSFERS_FAILED,
    payload
});

export const destroyBankAccountTransfers = (payload) => ({
    type: DESTROY_BANK_ACCOUNT_TRANSFERS_START,
    payload
});

export const destroyBankAccountTransfersSuccess = (payload) => ({
    type: DESTROY_BANK_ACCOUNT_TRANSFERS_SUCCESS,
    payload
});

export const destroyBankAccountTransfersFailed = (payload) => ({
    type: DESTROY_BANK_ACCOUNT_TRANSFERS_FAILED,
    payload
});