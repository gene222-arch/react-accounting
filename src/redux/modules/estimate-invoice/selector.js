import { createSelector } from 'reselect';

const getEstimateInvoice = state => state.estimateInvoice;

export const selectEstimateInvoice = createSelector(
    [getEstimateInvoice],
    estimateInvoice => estimateInvoice
);