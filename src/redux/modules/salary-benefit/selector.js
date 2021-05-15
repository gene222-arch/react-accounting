import { createSelector } from 'reselect';

const getSalaryBenefit = state => state.salaryBenefit;

export const selectSalaryBenefit = createSelector(
    [getSalaryBenefit],
    salaryBenefit => salaryBenefit
);