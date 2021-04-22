import { createSelector } from 'reselect';

const getChartOfAccount = state => state.chartOfAccount;

export const selectChartOfAccount = createSelector(
    [getChartOfAccount],
    chartOfAccount => chartOfAccount
);