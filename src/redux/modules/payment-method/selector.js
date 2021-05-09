import { createSelector } from 'reselect';

const getPaymentMethod = state => state.paymentMethod;

export const selectPaymentMethod = createSelector(
    [getPaymentMethod],
    paymentMethod => paymentMethod
);