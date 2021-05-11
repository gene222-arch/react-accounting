import { createSelector } from 'reselect';

const getBankAccountTransfer = state => state.bankAccountTransfer;

export const selectBankAccountTransfer = createSelector(
    [getBankAccountTransfer],
    bankAccountTransfer => bankAccountTransfer
);