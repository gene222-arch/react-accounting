import { createSelector } from 'reselect';

const getEmployee = state => state.employee;

export const selectEmployee = createSelector(
    [getEmployee],
    employee => employee
);