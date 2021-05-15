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

    /** Vendors */
    VENDOR: '/purchases/vendors',
    CREATE_VENDOR: '/purchases/vendors/new',
    UPDATE_VENDOR: '/purchases/vendors/:id/edit',

    /** Bills */
    BILL: '/purchases/bills',
    CREATE_BILL: '/purchases/bills/new',
    VIEW_BILL: '/purchases/bills/:id',
    UPDATE_BILL: '/purchases/bills/:id/edit',

    /** Payments */
    PAYMENT: '/purchases/payments',
    CREATE_PAYMENT: '/purchases/payments/new',
    UPDATE_PAYMENT: '/purchases/payments/:id/edit',

    /** Accounts */
    ACCOUNT: '/banking/accounts',
    CREATE_ACCOUNT: '/banking/accounts/new',
    UPDATE_ACCOUNT: '/banking/accounts/:id/edit',

    /** Transfers */
    BANK_ACCOUNT_TRANSFER: '/banking/transfers',
    CREATE_BANK_ACCOUNT_TRANSFER: '/banking/transfers/new',
    UPDATE_BANK_ACCOUNT_TRANSFER: '/banking/transfers/:id/edit',

    /** Reconciliations */
    BANK_ACCOUNT_RECONCILIATION: '/banking/reconciliation',
    CREATE_BANK_ACCOUNT_RECONCILIATION: '/banking/reconciliation/new',
    UPDATE_BANK_ACCOUNT_RECONCILIATION: '/banking/reconciliation/:id/edit',

    /** Transactions */
    TRANSACTION: '/banking/transactions',

    /** Customers */
    CUSTOMER: '/sales/customers',
    CREATE_CUSTOMER: '/sales/customers/new',
    UPDATE_CUSTOMER: '/sales/customers/:id/edit',

    /** Invoices */
    INVOICE: '/sales/invoices',
    VIEW_INVOICE: '/sales/invoices/:id',
    CREATE_INVOICE: '/sales/invoices/new',
    UPDATE_INVOICE: '/sales/invoices/:id/edit',

    /** Revenues */
    REVENUE: '/sales/revenues',
    CREATE_REVENUE: '/sales/revenues/new',
    UPDATE_REVENUE: '/sales/revenues/:id/edit',

    SETTINGS: '/settings',

    /** Taxes */
    TAX: '/settings/taxes',
    CREATE_TAX: '/settings/taxes/new',
    UPDATE_TAX: '/settings/taxes/:id/edit',
    
    /** Categories */
    CATEGORIES: '/settings/categories',

    /** Currencies */
    CURRENCY: '/settings/currencies',
    CREATE_CURRENCY: '/settings/currencies/new',
    UPDATE_CURRENCY: '/settings/currencies/:id/edit',
        
    /** Companies */
    CREATE_COMPANY: '/settings/company/new',
    UPDATE_COMPANY: '/settings/company/:id/edit',

    /** Income Category */
    INCOME_CATEGORY: '/settings/income-categories',
    CREATE_INCOME_CATEGORY: '/settings/income-categories/new',
    UPDATE_INCOME_CATEGORY: '/settings/income-categories/:id/edit',

    /** Expense Category */
    EXPENSE_CATEGORY: '/settings/expense-categories',
    CREATE_EXPENSE_CATEGORY: '/settings/expense-categories/new',
    UPDATE_EXPENSE_CATEGORY: '/settings/expense-categories/:id/edit',

    /** Payment methods */
    PAYMENT_METHOD: '/settings/payment-methods',
    CREATE_PAYMENT_METHOD: '/settings/payment-methods/new',
    UPDATE_PAYMENT_METHOD: '/settings/payment-methods/:id/edit',

    /** Contribution */
    CONTRIBUTION: '/settings/contributions',
    CREATE_CONTRIBUTION: '/settings/contributions/new',
    UPDATE_CONTRIBUTION: '/settings/contributions/:id/edit',

    /** Salary Benefits */
    SALARY_BENEFIT: '/settings/salary-benefits',
    CREATE_SALARY_BENEFIT: '/settings/salary-benefits/new',
    UPDATE_SALARY_BENEFIT: '/settings/salary-benefits/:id/edit',

    /** Stock adjustments */
    STOCK_ADJUSTMENT: '/inventory-management/stock-adjustments',
    VIEW_STOCK_ADJUSTMENT: '/inventory-management/stock-adjustments/:id',
    CREATE_STOCK_ADJUSTMENT: '/inventory-management/stock-adjustments/new',

    /** Warehouses */
    WAREHOUSE: '/inventory-management/warehouses',
    VIEW_WAREHOUSE: '/inventory-management/warehouses/:id',
    CREATE_WAREHOUSE: '/inventory-management/warehouses/new',
    UPDATE_WAREHOUSE: '/inventory-management/warehouses/:id/edit',

    /** Warehouses */
    PAY_CALENDAR: '/human-resources/payrolls/pay-calendars',
    CREATE_PAY_CALENDAR: '/human-resources/payrolls/pay-calendars/new',
    UPDATE_PAY_CALENDAR: '/human-resources/payrolls/pay-calendars/:id/edit',

    /** Employees */
    EMPLOYEE: '/human-resources/employees',
    CREATE_EMPLOYEE: '/human-resources/employees/new',
    VIEW_EMPLOYEE: '/human-resources/employees/:id',
    UPDATE_EMPLOYEE: '/human-resources/employees/:id/edit',
};


export default PATH;