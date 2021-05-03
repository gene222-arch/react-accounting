import { createSelector } from 'reselect';

const getDiscount = state => state.discount;

export const selectDiscount = createSelector(
    [getDiscount],
    discount => discount
);