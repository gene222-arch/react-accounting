import { createSelector } from 'reselect';

const getAccount = state => state.account;

export const selectAccount = createSelector(
    [getAccount],
    account => account
);