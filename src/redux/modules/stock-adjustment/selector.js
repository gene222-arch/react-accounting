import { createSelector } from 'reselect';

const getStockAdjustment = state => state.stockAdjustment;

export const selectStockAdjustment = createSelector(
    [getStockAdjustment],
    stockAdjustment => stockAdjustment
);