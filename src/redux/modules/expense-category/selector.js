import { createSelector } from 'reselect';

const getExpenseCategory = state => state.expenseCategory;

export const selectExpenseCategory = createSelector(
    [getExpenseCategory],
    expenseCategory => expenseCategory
);