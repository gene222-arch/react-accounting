import ACTION_TYPES from './action.types';

const 
{
    GET_JOURNAL_ENTRIES_START,
    GET_JOURNAL_ENTRIES_SUCCESS,
    GET_JOURNAL_ENTRIES_FAILED,

    CREATE_JOURNAL_ENTRY_START,
    CREATE_JOURNAL_ENTRY_SUCCESS,
    CREATE_JOURNAL_ENTRY_FAILED,

    UPDATE_JOURNAL_ENTRY_START,
    UPDATE_JOURNAL_ENTRY_SUCCESS,
    UPDATE_JOURNAL_ENTRY_FAILED,

    DESTROY_JOURNAL_ENTRIES_START,
    DESTROY_JOURNAL_ENTRIES_SUCCESS,
    DESTROY_JOURNAL_ENTRIES_FAILED
} = ACTION_TYPES;

/**
 * Fetching records
 */
export const getJournalEntries = () => ({
   type: GET_JOURNAL_ENTRIES_START
});

export const getJournalEntriesSuccess = (payload) => ({
   type: GET_JOURNAL_ENTRIES_SUCCESS,
   payload
});

export const getJournalEntriesFailed = (payload) => ({
   type: GET_JOURNAL_ENTRIES_FAILED,
   payload
});

/**
* Create a new record
*/

export const createJournalEntry = (payload) => ({
   type: CREATE_JOURNAL_ENTRY_START,
   payload
});

export const createJournalEntrySuccess = (payload) => ({
   type: CREATE_JOURNAL_ENTRY_SUCCESS,
   payload
});

export const createJournalEntryFailed = (payload) => ({
   type: CREATE_JOURNAL_ENTRY_FAILED,
   payload
});

/**
* Update an existing record
*/

export const updateJournalEntry = (payload) => ({
   type: UPDATE_JOURNAL_ENTRY_START,
   payload
});

export const updateJournalEntrySuccess = (payload) => ({
   type: UPDATE_JOURNAL_ENTRY_SUCCESS,
   payload
});

export const updateJournalEntryFailed = (payload) => ({
   type: UPDATE_JOURNAL_ENTRY_FAILED,
   payload
});

/**
* Delete one or multiple records
*/

export const destroyJournalEntries = (payload) => ({
   type: DESTROY_JOURNAL_ENTRIES_START,
   payload
});

export const destroyJournalEntriesSuccess = (payload) => ({
   type: DESTROY_JOURNAL_ENTRIES_SUCCESS,
   payload
});

export const destroyJournalEntriesFailed = (payload) => ({
   type: DESTROY_JOURNAL_ENTRIES_FAILED,
   payload
});