import { createSelector } from 'reselect';

const getInvoice = state => state.invoice;

export const selectInvoice = createSelector(
    [getInvoice],
    invoice => invoice
);