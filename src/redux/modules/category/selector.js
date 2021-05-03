import { createSelector } from 'reselect';

const getCategory = state => state.category;

export const selectCategory = createSelector(
    [getCategory],
    category => category
);