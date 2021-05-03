import { createSelector } from 'reselect';

const getIncomeCategory = state => state.incomeCategory;

export const selectIncomeCategory = createSelector(
    [getIncomeCategory],
    incomeCategory => incomeCategory
);