import { createSelector } from 'reselect';

const getCompany = state => state.company;

export const selectCompany = createSelector(
    [getCompany],
    company => company
);