import ACTION_TYPES from './action.types';

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


export const getBankAccountReconciliations = () => ({
    type: GET_BANK_ACCOUNT_RECONCILIATIONS_START
});

export const getBankAccountReconciliationsSuccess = (payload) => ({
    type: GET_BANK_ACCOUNT_RECONCILIATIONS_SUCCESS,
    payload
});

export const getBankAccountReconciliationsFailed = (payload) => ({
    type: GET_BANK_ACCOUNT_RECONCILIATIONS_FAILED,
    payload
});

export const createBankAccountReconciliation = (payload) => ({
    type: CREATE_BANK_ACCOUNT_RECONCILIATION_START,
    payload
});

export const createBankAccountReconciliationSuccess = () => ({
    type: CREATE_BANK_ACCOUNT_RECONCILIATION_SUCCESS
});

export const createBankAccountReconciliationFailed = (payload) => ({
    type: CREATE_BANK_ACCOUNT_RECONCILIATION_FAILED,
    payload
});

export const updateBankAccountReconciliation = (payload) => ({
    type: UPDATE_BANK_ACCOUNT_RECONCILIATION_START,
    payload
});

export const updateBankAccountReconciliationSuccess = () => ({
    type: UPDATE_BANK_ACCOUNT_RECONCILIATION_SUCCESS
});

export const updateBankAccountReconciliationFailed = (payload) => ({
    type: UPDATE_BANK_ACCOUNT_RECONCILIATION_FAILED,
    payload
});

export const reverseBankAccountReconciliations = (payload) => ({
    type: REVERSE_BANK_ACCOUNT_RECONCILIATIONS_START,
    payload
});

export const reverseBankAccountReconciliationsSuccess = (payload) => ({
    type: REVERSE_BANK_ACCOUNT_RECONCILIATIONS_SUCCESS,
    payload
});

export const reverseBankAccountReconciliationsFailed = (payload) => ({
    type: REVERSE_BANK_ACCOUNT_RECONCILIATIONS_FAILED,
    payload
});

export const destroyBankAccountReconciliations = (payload) => ({
    type: DESTROY_BANK_ACCOUNT_RECONCILIATIONS_START,
    payload
});

export const destroyBankAccountReconciliationsSuccess = (payload) => ({
    type: DESTROY_BANK_ACCOUNT_RECONCILIATIONS_SUCCESS,
    payload
});

export const destroyBankAccountReconciliationsFailed = (payload) => ({
    type: DESTROY_BANK_ACCOUNT_RECONCILIATIONS_FAILED,
    payload
});