import { createSelector } from 'reselect';

const getBill = state => state.bill;

export const selectBill = createSelector(
    [getBill],
    bill => bill
);