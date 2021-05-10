import { createSelector } from 'reselect';

const getWarehouse = state => state.warehouse;

export const selectWarehouse = createSelector(
    [getWarehouse],
    warehouse => warehouse
);