import { createSelector } from 'reselect';

const getPayment = state => state.payment;

export const selectPayment = createSelector(
    [getPayment],
    payment => payment
);