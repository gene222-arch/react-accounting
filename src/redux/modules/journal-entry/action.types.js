const ACTION_TYPES = 
{
    GET_JOURNAL_ENTRIES_START: 'GET_JOURNAL_ENTRIES_START',
    GET_JOURNAL_ENTRIES_SUCCESS: 'GET_JOURNAL_ENTRIES_SUCCESS',
    GET_JOURNAL_ENTRIES_FAILED: 'GET_JOURNAL_ENTRIES_FAILED',
    
    CREATE_JOURNAL_ENTRY_START: 'CREATE_JOURNAL_ENTRY_START',
    CREATE_JOURNAL_ENTRY_SUCCESS: 'CREATE_JOURNAL_ENTRY_SUCCESS',
    CREATE_JOURNAL_ENTRY_FAILED: 'CREATE_JOURNAL_ENTRY_FAILED',

    UPDATE_JOURNAL_ENTRY_START: 'UPDATE_JOURNAL_ENTRY_START',
    UPDATE_JOURNAL_ENTRY_SUCCESS: 'UPDATE_JOURNAL_ENTRY_SUCCESS',
    UPDATE_JOURNAL_ENTRY_FAILED: 'UPDATE_JOURNAL_ENTRY_FAILED',

    DESTROY_JOURNAL_ENTRIES_START: 'DESTROY_JOURNAL_ENTRIES_START',
    DESTROY_JOURNAL_ENTRIES_SUCCESS: 'DESTROY_JOURNAL_ENTRIES_SUCCESS',
    DESTROY_JOURNAL_ENTRIES_FAILED: 'DESTROY_JOURNAL_ENTRIES_FAILED',
};

export default ACTION_TYPES;