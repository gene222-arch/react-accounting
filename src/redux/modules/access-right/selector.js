import { createSelector } from 'reselect';

const getAccessRight = state => state.accessRight;

export const selectAccessRight = createSelector(
    [getAccessRight],
    accessRight => accessRight
);