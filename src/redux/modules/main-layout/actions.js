import ACTION_TYPES from './action.types';


const { 
    TOGGLE_DRAWER, 

    TOGGLE_DASHBOARDS, 
    SELECT_MAIN_DASHBOARD, 
    SELECT_PAYROLL_DASHBOARD,
    SELECT_DOUBLE_ENTRY_DASHBOARD,

    TOGGLE_DOUBLE_ENTRY,
    SELECT_DOUBLE_ENTRY_CHART_OF_ACCOUNT,
    SELECT_DOUBLE_ENTRY_JOURNAL_ENTRY,
    SELECT_DOUBLE_ENTRY_CHART_OF_ACCOUNT_TYPE,
    
    TOGGLE_ITEMS,
    SELECT_ITEMS_ITEM,
    SELECT_ITEMS_CATEGORY,
    SELECT_ITEMS_DISCOUNT,

    TOGGLE_INVENTORY,
    SELECT_INVENTORY_STOCK_ADJUSTMENT,
    SELECT_INVENTORY_WAREHOUSE,

    TOGGLE_SALES,
    SELECT_SALES_DEBIT_NOTE,
    SELECT_SALES_INVOICE,
    SELECT_SALES_ESTIMATE,
    SELECT_SALES_REVENUE,
    SELECT_SALES_CUSTOMER,

    TOGGLE_PURCHASES,
    SELECT_PURCHASES_CREDIT_NOTE,
    SELECT_PURCHASES_BILL,
    SELECT_PURCHASES_PAYMENT,
    SELECT_PURCHASES_VENDOR,

    TOGGLE_BANKING,
    SELECT_BANKING_ACCOUNT,
    SELECT_BANKING_TRANSFER,
    SELECT_BANKING_TRANSACTION,
    SELECT_BANKING_RECONCILIATION,

    TOGGLE_PAYROLL,
    SELECT_PAYROLL_PAY_CALENDAR,
    SELECT_PAYROLL_RUN_PAYROLL,

    EMPLOYEES,
    ACCESS_RIGHTS,
    REPORTS,
    SETTINGS
} = ACTION_TYPES;


export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER
});

/** Dropdowns */

/**
 * Dashboards
 */
export const toggleDashboards = () => ({
    type: TOGGLE_DASHBOARDS
});

export const selectMainDashboard = () => ({
    type: SELECT_MAIN_DASHBOARD
});

export const selectPayrollDashboard = () => ({
    type: SELECT_PAYROLL_DASHBOARD
});

export const selectDoubleEntryDashboard = () => ({
    type: SELECT_DOUBLE_ENTRY_DASHBOARD
});

/**
 * Double Entry
 */
export const toggleDoubleEntry = () => ({
    type: TOGGLE_DOUBLE_ENTRY
});

export const selectDoubleEntryChartOfAccount = () => ({
    type: SELECT_DOUBLE_ENTRY_CHART_OF_ACCOUNT
});

export const selectDoubleEntryChartOfAccountType = () => ({
    type: SELECT_DOUBLE_ENTRY_CHART_OF_ACCOUNT_TYPE
});

export const selectDoubleEntryJournalEntry = () => ({
    type: SELECT_DOUBLE_ENTRY_JOURNAL_ENTRY
});

/**
 * Items
 */

export const toggleItems = () => ({
    type: TOGGLE_ITEMS
});

export const selectItemsItem = () => ({
    type: SELECT_ITEMS_ITEM
});

export const selectItemsCategory = () => ({
    type: SELECT_ITEMS_CATEGORY
});

export const selectItemsDiscount = () => ({
    type: SELECT_ITEMS_DISCOUNT
});


/**
 * Inventory
 */
export const toggleInventory = () => ({
    type: TOGGLE_INVENTORY
});

export const selectInventoryStockAdjustment = () => ({
    type: SELECT_INVENTORY_STOCK_ADJUSTMENT
});

export const selectInventoryWarehouse = () => ({
    type: SELECT_INVENTORY_WAREHOUSE
});


/**
 * Sales
 */
export const toggleSales = () => ({
    type: TOGGLE_SALES
});

export const selectSalesDebitNote = () => ({
    type: SELECT_SALES_DEBIT_NOTE
});

export const selectSalesInvoice = () => ({
    type: SELECT_SALES_INVOICE
});

export const selectSalesEstimate = () => ({
    type: SELECT_SALES_ESTIMATE
});

export const selectSalesRevenue = () => ({
    type: SELECT_SALES_REVENUE
});

export const selectSalesCustomer = () => ({
    type: SELECT_SALES_CUSTOMER
});

/**
 * Purchases
 */

export const togglePurchases = () => ({
    type: TOGGLE_PURCHASES
});

export const selectPurchasesCreditNote = () => ({
    type: SELECT_PURCHASES_CREDIT_NOTE
});

export const selectPurchasesBill = () => ({
    type: SELECT_PURCHASES_BILL
});

export const selectPurchasesPayment = () => ({
    type: SELECT_PURCHASES_PAYMENT
});

export const selectPurchasesVendor = () => ({
    type: SELECT_PURCHASES_VENDOR
});

/**
 * Banking
 */


export const toggleBanking = () => ({
    type: TOGGLE_BANKING
});

export const selectBankingAccount = () => ({
    type: SELECT_BANKING_ACCOUNT
});

export const selectBankingTransfer = () => ({
    type: SELECT_BANKING_TRANSFER
});

export const selectBankingTransaction = () => ({
    type: SELECT_BANKING_TRANSACTION
});

export const selectBankingReconciliation = () => ({
    type: SELECT_BANKING_RECONCILIATION
});

/**
 * Payroll
 */

export const togglePayroll = () => ({
    type: TOGGLE_PAYROLL
});

export const selectPayrollPayCalendar = () => ({
    type: SELECT_PAYROLL_PAY_CALENDAR
});

export const selectPayrollRunPayroll = () => ({
    type: SELECT_PAYROLL_RUN_PAYROLL
});

/**
 * Employees
 */
export const selectEmployees = () => ({
    type: EMPLOYEES
});

/**
 * Access Rights
 */
 export const selectAccessRights = () => ({
    type: ACCESS_RIGHTS
});

/**
 * Reports
 */
export const selectReports = () => ({
    type: REPORTS
});

/**
 * Settings
 */
export const selectSettings = () => ({
    type: SETTINGS
});