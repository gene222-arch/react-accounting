const PATH = 
{
    DASHBOARD: '/',
    LOGIN: '/auth/sign-in',
    LOGOUT: '/logout',
    REGISTER: '/auth/create-an-account',
    EMAIL_VERIFICATION: '/email/resend',
    EMAIL_VERIFIED: '/email/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password/email',
    RESET_PASSWORD: '/auth/forgot-password/reset',

    /** Chart of account types */
    CHART_OF_ACCOUNT_TYPE: '/double-entry/chart-of-account-types',
    CREATE_CHART_OF_ACCOUNT_TYPE: '/double-entry/chart-of-account-types/new',
    UPDATE_CHART_OF_ACCOUNT_TYPE: '/double-entry/chart-of-account-types/:id/edit',

    /** Chart of accounts */
    CHART_OF_ACCOUNT: '/double-entry/chart-of-accounts',
    CREATE_CHART_OF_ACCOUNT: '/double-entry/chart-of-accounts/new',
    UPDATE_CHART_OF_ACCOUNT: '/double-entry/chart-of-accounts/:id/edit',
};


export default PATH;