import { createSelector } from 'reselect';

const getBankAccountReconciliation = state => state.bankAccountReconciliation;

export const selectBankAccountReconciliation = createSelector(
    [getBankAccountReconciliation],
    bankAccountReconciliation => bankAccountReconciliation
);