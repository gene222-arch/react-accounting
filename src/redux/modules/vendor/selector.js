import { createSelector } from 'reselect';

const getVendor = state => state.vendor;

export const selectVendor = createSelector(
    [getVendor],
    vendor => vendor
);