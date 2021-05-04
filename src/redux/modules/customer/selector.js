import { createSelector } from 'reselect';

const getCustomer = state => state.customer;

export const selectCustomer = createSelector(
    [getCustomer],
    customer => customer
);