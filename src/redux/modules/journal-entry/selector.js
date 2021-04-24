import { createSelector } from 'reselect';

const getJournalEntry = state => state.journalEntry;

export const selectJournalEntry = createSelector(
    [getJournalEntry],
    journalEntry => journalEntry
);