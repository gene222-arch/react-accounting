import { createSelector } from 'reselect';

const getRunPayroll = state => state.runPayroll;

export const selectRunPayroll = createSelector(
    [getRunPayroll],
    runPayroll => runPayroll
);