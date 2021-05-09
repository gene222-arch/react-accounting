import { createSelector } from 'reselect';

const getRevenue = state => state.revenue;

export const selectRevenue = createSelector(
    [getRevenue],
    revenue => revenue
);