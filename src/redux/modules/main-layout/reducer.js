import ACTION_TYPES from './action.types';


const { 
    TOGGLE_DRAWER, 

    TOGGLE_DASHBOARDS, 
    SELECT_MAIN_DASHBOARD, 
    SELECT_PAYROLL_DASHBOARD,
    SELECT_DOUBLE_ENTRY_DASHBOARD,

    TOGGLE_DOUBLE_ENTRY,
    SELECT_DOUBLE_ENTRY_CHART_OF_ACCOUNT,
    SELECT_DOUBLE_ENTRY_CHART_OF_ACCOUNT_TYPE,
    SELECT_DOUBLE_ENTRY_JOURNAL_ENTRY,

    TOGGLE_ITEMS,
    SELECT_ITEMS_ITEM,
    SELECT_ITEMS_CATEGORY,
    SELECT_ITEMS_DISCOUNT,

    TOGGLE_INVENTORY,
    SELECT_INVENTORY_STOCK_ADJUSTMENT,
    SELECT_INVENTORY_VENDOR,
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

    TOGGLE_BANKING,
    SELECT_BANKING_ACCOUNT,
    SELECT_BANKING_TRANSFER,
    SELECT_BANKING_TRANSACTION,
    SELECT_BANKING_RECONCILIATION,

    TOGGLE_PAYROLL,
    SELECT_PAYROLL_PAY_CALENDAR,
    SELECT_PAYROLL_RUN_PAYROLL,

    REPORTS,
    SETTINGS
} = ACTION_TYPES;

const DEFAULT_STATE = {
    drawer: true,

    /** Dashboards */
    dashboards: false,
    mainDashboard: false,
    payrollDashboard: false,
    doubleEntryDashboard: false,

    /** Items */
    items: false,
    itemsItem: false,
    itemsCategory: false,
    itemsDiscount: false,

    /** Inventory */
    inventory: false,
    inventoryStockAdjustment: false,
    inventoryVendor: false,
    inventoryWarehouse: false,

    /** Sales */
    sales: false,
    salesDebitNote: false,
    salesInvoice: false,
    salesEstimate: false,
    salesRevenue: false,
    salesCustomer: false,

    /** Purchases */
    purchases: false,
    purchasesBill: false,
    purchasesPayment: false,

    /** Banking */
    banking: false,
    bankingAccount: false,
    bankingTransfer: false,
    bankingTransaction: false,
    bankingReconciliation: false,

    /** Payroll */
    payroll: false,
    payrollPayCalendar: false,
    payrollRunPayroll: false,

    reports: false,
    settings: false,
};

const initialState = {
    drawer: false,

    /** Dashboards */
    dashboards: false,
    mainDashboard: false,
    payrollDashboard: false,
    doubleEntryDashboard: false,

    /** Double Entry */
    doubleEntry: false,
    doubleEntryChartOfAccount: false,
    doubleEntryChartOfAccountType: false,
    doubleEntryJournalEntry: false,

    /** Items */
    items: false,
    itemsItem: false,
    itemsCategory: false,
    itemsDiscount: false,

    /** Inventory */
    inventory: false,
    inventoryStockAdjustment: false,
    inventoryVendor: false,
    inventoryWarehouse: false,

    /** Sales */
    sales: false,
    salesDebitNote: false,
    salesInvoice: false,
    salesEstimate: false,
    salesRevenue: false,
    salesCustomer: false,

    /** Purchases */
    purchases: false,
    purchasesBill: false,
    purchasesPayment: false,

    /** Banking */
    banking: false,
    bankingAccount: false,
    bankingTransfer: false,
    bankingTransaction: false,
    bankingReconciliation: false,

    /** Payroll */
    payroll: false,
    payrollPayCalendar: false,
    payrollRunPayroll: false,

    reports: false,
    settings: false,

    currentSelectedItem: 'Dashboards',
    currentSelectedDropdown: '',
    currentSelectedDropdownItem: '',
};

export default (state = initialState, { type }) => 
{
    const { 
        currentSelectedItem, 
        currentSelectedDropdown, 
        currentSelectedDropdownItem, 
        drawer, 
        dashboards, 
        mainDashboard,
        payrollDashboard, 
        doubleEntryDashboard,
        doubleEntry,
        doubleEntryChartOfAccount,
        doubleEntryChartOfAccountType,
        doubleEntryJournalEntry,
        items,
        itemsItem,
        itemsCategory,
        itemsDiscount,
        inventory,
        inventoryStockAdjustment,
        inventoryVendor,
        inventoryWarehouse,
        sales,
        salesDebitNote,
        salesInvoice,
        salesEstimate,
        salesRevenue,
        salesCustomer,
        purchases,
        purchasesCreditNote,
        purchasesBill,
        purchasesPayment,
        banking,
        bankingAccount,
        bankingTransfer,
        bankingTransaction,
        bankingReconciliation,
        payroll,
        payrollPayCalendar,
        payrollRunPayroll,
        reports,
        settings
    } = state;

    switch (type) 
    {
        case TOGGLE_DRAWER:
            return { 
                ...state,
                ...DEFAULT_STATE, 
                drawer: !drawer,
                currentSelectedItem, 
                [currentSelectedDropdown]: !drawer,
                [currentSelectedDropdownItem]: !drawer,
            };

        case TOGGLE_DASHBOARDS: 
            return { 
                ...DEFAULT_STATE,
                dashboards: !dashboards,

                [currentSelectedDropdownItem]: !dashboards,
                currentSelectedItem,  
                currentSelectedDropdown: 'dashboards',
                currentSelectedDropdownItem
            };

        case SELECT_MAIN_DASHBOARD: 
            return { 
                ...DEFAULT_STATE, 
                dashboards: true,
                mainDashboard: !mainDashboard, 
                currentSelectedItem: 'Main',
                currentSelectedDropdown: 'dashboards',
                currentSelectedDropdownItem: 'mainDashboard'
            };

        case SELECT_PAYROLL_DASHBOARD: 
            return { 
                ...DEFAULT_STATE, 
                dashboards: true,
                payrollDashboard: !payrollDashboard, 
                currentSelectedItem: 'Payroll',
                currentSelectedDropdown: 'dashboards',
                currentSelectedDropdownItem: 'payrollDashboard'
            };

        case SELECT_DOUBLE_ENTRY_DASHBOARD: 
            return {
                ...DEFAULT_STATE,
                dashboards: true,
                doubleEntryDashboard: !doubleEntryDashboard,
                currentSelectedItem: 'Double Entry',
                currentSelectedDropdown: 'dashboards',
                currentSelectedDropdownItem: 'doubleEntryDashboard'
            };

        case TOGGLE_DOUBLE_ENTRY: 
            return { 
                ...DEFAULT_STATE,
                doubleEntry: !doubleEntry,

                [currentSelectedDropdownItem]: !doubleEntry,
                currentSelectedItem,  
                currentSelectedDropdown: 'doubleEntry',
                currentSelectedDropdownItem
            };

        case SELECT_DOUBLE_ENTRY_CHART_OF_ACCOUNT: 
            return { 
                ...DEFAULT_STATE, 
                doubleEntry: true,
                doubleEntryChartOfAccount: !doubleEntryChartOfAccount, 
                currentSelectedItem: 'Chart of Accounts',
                currentSelectedDropdown: 'doubleEntry',
                currentSelectedDropdownItem: 'doubleEntryChartOfAccount'
            };

        case SELECT_DOUBLE_ENTRY_CHART_OF_ACCOUNT_TYPE: 
            return { 
                ...DEFAULT_STATE, 
                doubleEntry: true,
                doubleEntryChartOfAccountType: !doubleEntryChartOfAccountType, 
                currentSelectedItem: 'Chart of Account Types',
                currentSelectedDropdown: 'doubleEntry',
                currentSelectedDropdownItem: 'doubleEntryChartOfAccountType'
            };

        case SELECT_DOUBLE_ENTRY_JOURNAL_ENTRY: 
            return { 
                ...DEFAULT_STATE, 
                doubleEntry: true,
                doubleEntryJournalEntry: !doubleEntryJournalEntry, 
                currentSelectedItem: 'Journal Entries',
                currentSelectedDropdown: 'doubleEntry',
                currentSelectedDropdownItem: 'doubleEntryJournalEntry'
            };

        case TOGGLE_ITEMS: 
            return { 
                ...DEFAULT_STATE, 
                items: !items,
                currentSelectedItem,
                currentSelectedDropdown: 'items',
                currentSelectedDropdownItem
            };

        case SELECT_ITEMS_ITEM:
            return {
                ...DEFAULT_STATE,
                items: true,
                itemsItem: !itemsItem,
                currentSelectedItem: 'Item',
                currentSelectedDropdown: 'items',
                currentSelectedDropdownItem: 'itemsItem'
            };  

        case SELECT_ITEMS_CATEGORY:
            return {
                ...DEFAULT_STATE,
                items: true,
                itemsCategory: !itemsCategory,
                currentSelectedItem: 'Category',
                currentSelectedDropdown: 'items',
                currentSelectedDropdownItem: 'itemsCategory'
            };  

        case SELECT_ITEMS_DISCOUNT:
            return {
                ...DEFAULT_STATE,
                items: true,
                itemsDiscount: !itemsDiscount,
                currentSelectedItem: 'Discount',
                currentSelectedDropdown: 'items',
                currentSelectedDropdownItem: 'itemsDiscount'
            };  

        case TOGGLE_INVENTORY: 
            return { 
                ...DEFAULT_STATE,
                inventory: !inventory,
                [currentSelectedDropdownItem]: !inventory,
                currentSelectedItem,  
                currentSelectedDropdown: 'inventory',
                currentSelectedDropdownItem
            };

        case SELECT_INVENTORY_STOCK_ADJUSTMENT:
            return {
                ...DEFAULT_STATE,
                inventory: true,
                inventoryStockAdjustment: !inventoryStockAdjustment,
                currentSelectedItem: 'Stock adjustments',
                currentSelectedDropdown: 'inventory',
                currentSelectedDropdownItem: 'inventoryStockAdjustment'
            };  

        case SELECT_INVENTORY_VENDOR:
            return {
                ...DEFAULT_STATE,
                inventory: true,
                inventoryVendor: !inventoryVendor,
                currentSelectedItem: 'Vendors',
                currentSelectedDropdown: 'inventory',
                currentSelectedDropdownItem: 'inventoryVendor'
            };  

        case SELECT_INVENTORY_WAREHOUSE:
            return {
                ...DEFAULT_STATE,
                inventory: true,
                inventoryWarehouse: !inventoryWarehouse,
                currentSelectedItem: 'Warehouses',
                currentSelectedDropdown: 'inventory',
                currentSelectedDropdownItem: 'inventoryWarehouse'
            };  
        
        case TOGGLE_SALES: 
            return { 
                ...DEFAULT_STATE,
                sales: !sales,
                [currentSelectedDropdownItem]: !sales,
                currentSelectedItem,  
                currentSelectedDropdown: 'sales',
                currentSelectedDropdownItem
            };
            
        case SELECT_SALES_DEBIT_NOTE:
            return {
                ...DEFAULT_STATE,
                sales: true,
                salesDebitNote: !salesDebitNote,
                currentSelectedItem: 'Debit Notes',
                currentSelectedDropdown: 'sales',
                currentSelectedDropdownItem: 'salesDebitNote'
            };  
    
        case SELECT_SALES_INVOICE:
            return {
                ...DEFAULT_STATE,
                sales: true,
                salesInvoice: !salesInvoice,
                currentSelectedItem: 'Invoices',
                currentSelectedDropdown: 'sales',
                currentSelectedDropdownItem: 'salesInvoice'
            };  

        case SELECT_SALES_ESTIMATE:
                return {
                    ...DEFAULT_STATE,
                    sales: true,
                    salesEstimate: !salesEstimate,
                    currentSelectedItem: 'Estimates',
                    currentSelectedDropdown: 'sales',
                    currentSelectedDropdownItem: 'salesEstimate'
                };              

        case SELECT_SALES_REVENUE:
            return {
                ...DEFAULT_STATE,
                sales: true,
                salesRevenue: !salesRevenue,
                currentSelectedItem: 'Revenues',
                currentSelectedDropdown: 'sales',
                currentSelectedDropdownItem: 'salesRevenue'
            };  

        case SELECT_SALES_CUSTOMER:
            return {
                ...DEFAULT_STATE,
                sales: true,
                salesCustomer: !salesCustomer,
                currentSelectedItem: 'Customers',
                currentSelectedDropdown: 'sales',
                currentSelectedDropdownItem: 'salesCustomer'
            };              
        
        case TOGGLE_PURCHASES: 
            return { 
                ...DEFAULT_STATE,
                purchases: !purchases,
                [currentSelectedDropdownItem]: !purchases,
                currentSelectedItem,  
                currentSelectedDropdown: 'purchases',
                currentSelectedDropdownItem
            };

        case SELECT_PURCHASES_CREDIT_NOTE: 
            return {
                ...DEFAULT_STATE,
                purchases: true,
                purchasesCreditNote: !purchasesCreditNote,
                currentSelectedItem: 'Credit Notes',
                currentSelectedDropdown: 'purchases',
                currentSelectedDropdownItem: 'purchasesCreditNote'
            };           

        case SELECT_PURCHASES_BILL:
            return {
                ...DEFAULT_STATE,
                purchases: true,
                purchasesBill: !purchasesBill,
                currentSelectedItem: 'Bills',
                currentSelectedDropdown: 'purchases',
                currentSelectedDropdownItem: 'purchasesBill'
            };  

        case SELECT_PURCHASES_PAYMENT:
            return {
                ...DEFAULT_STATE,
                purchases: true,
                purchasesPayment: !purchasesPayment,
                currentSelectedItem: 'Payments',
                currentSelectedDropdown: 'purchases',
                currentSelectedDropdownItem: 'purchasesPayment'
            };  

        case TOGGLE_BANKING: 
            return { 
                ...DEFAULT_STATE,
                banking: !banking,
                [currentSelectedDropdownItem]: !banking,
                currentSelectedItem,  
                currentSelectedDropdown: 'banking',
                currentSelectedDropdownItem
            };

        case SELECT_BANKING_ACCOUNT:
            return {
                ...DEFAULT_STATE,
                banking: true,
                bankingAccount: !bankingAccount,
                currentSelectedItem: 'Accounts',
                currentSelectedDropdown: 'banking',
                currentSelectedDropdownItem: 'bankingAccount'
            };  

        case SELECT_BANKING_TRANSFER:
            return {
                ...DEFAULT_STATE,
                banking: true,
                bankingTransfer: !bankingTransfer,
                currentSelectedItem: 'Transfers',
                currentSelectedDropdown: 'banking',
                currentSelectedDropdownItem: 'bankingTransfer'
            };   
            
        case SELECT_BANKING_TRANSACTION:
            return {
                ...DEFAULT_STATE,
                banking: true,
                bankingTransaction: !bankingTransaction,
                currentSelectedItem: 'Transactions',
                currentSelectedDropdown: 'banking',
                currentSelectedDropdownItem: 'bankingTransaction'
            };  

        case SELECT_BANKING_RECONCILIATION:
            return {
                ...DEFAULT_STATE,
                banking: true,
                bankingReconciliation: !bankingReconciliation,
                currentSelectedItem: 'Reconciliations',
                currentSelectedDropdown: 'banking',
                currentSelectedDropdownItem: 'bankingReconciliation'
            };  
       
        case TOGGLE_PAYROLL: 
            return { 
                ...DEFAULT_STATE,
                payroll: !payroll,
                [currentSelectedDropdownItem]: !payroll,
                currentSelectedItem,  
                currentSelectedDropdown: 'payroll',
                currentSelectedDropdownItem
            };

        case SELECT_PAYROLL_PAY_CALENDAR:
            return {
                ...DEFAULT_STATE,
                payroll: true,
                payrollPayCalendar: !payrollPayCalendar,
                currentSelectedItem: 'Pay Calendar',
                currentSelectedDropdown: 'payroll',
                currentSelectedDropdownItem: 'payrollPayCalendar'
            };  

        case SELECT_PAYROLL_RUN_PAYROLL:
            return {
                ...DEFAULT_STATE,
                payroll: true,
                payrollRunPayroll: !payrollRunPayroll,
                currentSelectedItem: 'Run Payrolls',
                currentSelectedDropdown: 'payroll',
                currentSelectedDropdownItem: 'payrollRunPayroll'
            };   
                      
        case REPORTS:
            return {
                ...DEFAULT_STATE,
                reports: !reports,
                currentSelectedItem: 'Reports',
                currentSelectedDropdownItem: 'reports'
            };  

        case SETTINGS:
            return {
                ...DEFAULT_STATE,
                settings: !settings,
                currentSelectedItem: 'Settings',
                currentSelectedDropdownItem: 'settings'
            };  
    
        default:
            return state;
    }
}
