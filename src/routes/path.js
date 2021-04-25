const PATH = 
{
    LOGIN: '/auth/sign-in',
    LOGOUT: '/logout',
    REGISTER: '/auth/create-an-account',
    EMAIL_VERIFICATION: '/email/resend',
    EMAIL_VERIFIED: '/email/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password/email',
    RESET_PASSWORD: '/auth/forgot-password/reset',

    /** Dashboards */
    MAIN_DASHBOARD: '/',
    PAYROLL_DASHBOARD: '/payroll',
    DOUBLE_ENTRY_DASHBOARD: '/double-entry',

    /** Chart of account types */
    CHART_OF_ACCOUNT_TYPE: '/double-entry/chart-of-account-types',
    CREATE_CHART_OF_ACCOUNT_TYPE: '/double-entry/chart-of-account-types/new',
    UPDATE_CHART_OF_ACCOUNT_TYPE: '/double-entry/chart-of-account-types/:id/edit',

    /** Chart of accounts */
    CHART_OF_ACCOUNT: '/double-entry/chart-of-accounts',
    CREATE_CHART_OF_ACCOUNT: '/double-entry/chart-of-accounts/new',
    UPDATE_CHART_OF_ACCOUNT: '/double-entry/chart-of-accounts/:id/edit',

    /** Journale entries */
    JOURNAL_ENTRY: '/double-entry/journal-entries',
    CREATE_JOURNAL_ENTRY: '/double-entry/journal-entries/new',
    UPDATE_JOURNAL_ENTRY: '/double-entry/journal-entries/:id/edit',

    /** Item */
    ITEM: '/items/items',
    CREATE_ITEM: '/items/items/new',
    UPDATE_ITEM: '/items/items/:id/edit',

    /** Category */
    CATEGORY: '/items/categories',
    CREATE_CATEGORY: '/items/categories/new',
    UPDATE_CATEGORY: '/items/categories/:id/edit',

    /** Discount */
    DISCOUNT: '/items/discounts',
    CREATE_DISCOUNT: '/items/discounts/new',
    UPDATE_DISCOUNT: '/items/discounts/:id/edit',
};


export default PATH;