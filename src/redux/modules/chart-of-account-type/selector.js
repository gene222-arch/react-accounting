
import { createSelector } from 'reselect';

const getChartOfAccountType = state => state.chartOfAccountType;

export const selectChartOfAccountType = createSelector(
    [getChartOfAccountType],
    chartOfAccountType => chartOfAccountType
);