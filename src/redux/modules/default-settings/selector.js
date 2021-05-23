import { createSelector } from 'reselect';

const getDefaultSettings = state => state.defaultSettings;

export const selectDefaultSettings = createSelector(
    [getDefaultSettings],
    defaultSettings => defaultSettings
);