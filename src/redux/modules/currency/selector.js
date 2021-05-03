import { createSelector } from 'reselect';

const getCurrency = state => state.currency;

export const selectCurrency = createSelector(
    [getCurrency],
    currency => currency
);