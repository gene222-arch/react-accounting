import { createSelector } from 'reselect';

const getTax = state => state.tax;

export const selectTax = createSelector(
    [getTax],
    tax => tax
);