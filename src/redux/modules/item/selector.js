import { createSelector } from 'reselect';

const getItem = state => state.item;

export const selectItem = createSelector(
    [getItem],
    item => item
);