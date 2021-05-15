import { createSelector } from 'reselect';

const getContribution = state => state.contribution;

export const selectContribution = createSelector(
    [getContribution],
    contribution => contribution
);