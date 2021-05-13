import { createSelector } from 'reselect';

const getPayCalendar = state => state.payCalendar;

export const selectPayCalendar = createSelector(
    [getPayCalendar],
    payCalendar => payCalendar
);