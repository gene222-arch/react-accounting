import { createSelector } from 'reselect';

const getPayroll = state => state.payroll;

export const selectPayroll = createSelector(
    [getPayroll],
    payroll => payroll
);