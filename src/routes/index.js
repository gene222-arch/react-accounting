import { lazy } from 'react'

/** Path */
import PATH from './path'

/** Lazy components */
const MainDashboard = lazy(() => import('../views/pages/dashboards/main/MainDashboard'))
const PayrollDashboard = lazy(() => import('../views/pages/dashboards/payroll/PayrollDashboard'))
const DoubleEntryDashboard = lazy(() => import('../views/pages/dashboards/double-entry/DoubleEntryDashboard'))
const EmailVerification = lazy(() => import('./../views/pages/auth/EmailVerification'))
const EmailVerified = lazy(() => import('./../views/pages/auth/EmailVerified'))
const ForgotPasswordForm = lazy(() => import('../views/pages/auth/ForgotPasswordForm'))
const LoginForm = lazy(() => import('../views/pages/auth/LoginForm'))
const RegistrationForm = lazy(() => import('../views/pages/auth/RegistrationForm'))
const ResetPasswordForm = lazy(() => import('../views/pages/auth/ResetPasswordForm'))
const ChartOfAccountType = lazy(() => import('../views/pages/double-entry/chart-of-account-type/ChartOfAccountType'))
const CreateChartOfAccountType = lazy(() => import('../views/pages/double-entry/chart-of-account-type/CreateChartOfAccountType'))
const UpdateChartOfAccountType = lazy(() => import('../views/pages/double-entry/chart-of-account-type/UpdateChartOfAccountType'))
const ChartOfAccount = lazy(() => import('../views/pages/double-entry/chart-of-account/ChartOfAccount'))
const CreateChartOfAccount = lazy(() => import('../views/pages/double-entry/chart-of-account/CreateChartOfAccount'))
const UpdateChartOfAccount = lazy(() => import('../views/pages/double-entry/chart-of-account/UpdateChartOfAccount'))
const JournalEntry = lazy(() => import('../views/pages/double-entry/journal-entry/JournalEntry'))
const CreateJournalEntry = lazy(() => import('../views/pages/double-entry/journal-entry/CreateJournalEntry'))
const UpdateJournalEntry = lazy(() => import('../views/pages/double-entry/journal-entry/UpdateJournalEntry'))
const Item = lazy(() => import('../views/pages/items/item/Item'))
const CreateItem = lazy(() => import('../views/pages/items/item/CreateItem'))
const UpdateItem = lazy(() => import('../views/pages/items/item/UpdateItem'))
const Category = lazy(() => import('../views/pages/items/category/Category'))
const CreateCategory = lazy(() => import('../views/pages/items/category/CreateCategory'))
const UpdateCategory = lazy(() => import('../views/pages/items/category/UpdateCategory'))
const Discount = lazy(() => import('../views/pages/items/discount/Discount'))
const CreateDiscount = lazy(() => import('../views/pages/items/discount/CreateDiscount'))
const UpdateDiscount = lazy(() => import('../views/pages/items/discount/UpdateDiscount'))
const Customer = lazy(() => import('../views/pages/sales/customer/Customer'))
const CreateCustomer = lazy(() => import('../views/pages/sales/customer/CreateCustomer'))
const UpdateCustomer = lazy(() => import('../views/pages/sales/customer/UpdateCustomer'))
const Invoice = lazy(() => import('../views/pages/sales/invoice/Invoice'))
const ViewInvoice = lazy(() => import('../views/pages/sales/invoice/view-invoice/ViewInvoice'))
const CreateInvoice = lazy(() => import('../views/pages/sales/invoice/create-invoice/CreateInvoice'))
const UpdateInvoice = lazy(() => import('../views/pages/sales/invoice/update-invoice/UpdateInvoice'))
const Revenue = lazy(() => import('../views/pages/sales/revenue/Revenue'))
const CreateRevenue = lazy(() => import('../views/pages/sales/revenue/CreateRevenue'))
const UpdateRevenue = lazy(() => import('../views/pages/sales/revenue/UpdateRevenue'))
const Bill = lazy(() => import('../views/pages/purchases/bill/Bill'))
const ViewBill = lazy(() => import('../views/pages/purchases/bill/view-bill/ViewBill'))
const CreateBill = lazy(() => import('../views/pages/purchases/bill/create-bill/CreateBill'))
const UpdateBill = lazy(() => import('../views/pages/purchases/bill/update-bill/UpdateBill'))
const Payment = lazy(() => import('../views/pages/purchases/payment/Payment'))
const CreatePayment = lazy(() => import('../views/pages/purchases/payment/CreatePayment'))
const UpdatePayment = lazy(() => import('../views/pages/purchases/payment/UpdatePayment'))
const Vendor = lazy(() => import('../views/pages/purchases/vendor/Vendor'))
const CreateVendor = lazy(() => import('../views/pages/purchases/vendor/CreateVendor'))
const UpdateVendor = lazy(() => import('../views/pages/purchases/vendor/UpdateVendor'))
const Account = lazy(() => import('../views/pages/banking/account/Account'))
const CreateAccount = lazy(() => import('../views/pages/banking/account/CreateAccount'))
const UpdateAccount = lazy(() => import('../views/pages/banking/account/UpdateAccount'))
const BankAccountTransfer = lazy(() => import('../views/pages/banking/bank-account-transfer/BankAccountTransfer'))
const CreateBankAccountTransfer = lazy(() => import('../views/pages/banking/bank-account-transfer/CreateBankAccountTransfer'))
const UpdateBankAccountTransfer = lazy(() => import('../views/pages/banking/bank-account-transfer/UpdateBankAccountTransfer'))
const BankAccountReconciliation = lazy(() => import('../views/pages/banking/bank-account-reconciliation/BankAccountReconciliation'))
const CreateBankAccountReconciliation = lazy(() => import('../views/pages/banking/bank-account-reconciliation/CreateBankAccountReconciliation'))
const UpdateBankAccountReconciliation = lazy(() => import('../views/pages/banking/bank-account-reconciliation/UpdateBankAccountReconciliation'))
const Transaction = lazy(() => import('../views/pages/banking/transaction/Transaction'))
const StockAdjustment = lazy(() => import('../views/pages/inventory/stock-adjustment/StockAdjustment'))
const ViewStockAdjustment = lazy(() => import('../views/pages/inventory/stock-adjustment/ViewStockAdjustment'))
const CreateStockAdjustment = lazy(() => import('../views/pages/inventory/stock-adjustment/CreateStockAdjustment'))
const Warehouse = lazy(() => import('../views/pages/inventory/warehouse/Warehouse'))
const ViewWarehouse = lazy(() => import('../views/pages/inventory/warehouse/ViewWarehouse'))
const CreateWarehouse = lazy(() => import('../views/pages/inventory/warehouse/CreateWarehouse'))
const UpdateWarehouse = lazy(() => import('../views/pages/inventory/warehouse/UpdateWarehouse'))
const Employee = lazy(() => import('../views/pages/employee/Employee'))
const ViewEmployee = lazy(() => import('../views/pages/employee/view-employee/ViewEmployee'))
const CreateEmployee = lazy(() => import('../views/pages/employee/CreateEmployee'))
const UpdateEmployee = lazy(() => import('../views/pages/employee/UpdateEmployee'))
const PayCalendar = lazy(() => import('../views/pages/payroll/pay-calendar/PayCalendar'))
const CreatePayCalendar = lazy(() => import('../views/pages/payroll/pay-calendar/CreatePayCalendar'))
const UpdatePayCalendar = lazy(() => import('../views/pages/payroll/pay-calendar/UpdatePayCalendar'))
const RunPayroll = lazy(() => import('../views/pages/payroll/run-payroll/RunPayroll'))
const CreateRunPayroll = lazy(() => import('../views/pages/payroll/run-payroll/CreateRunPayroll'))
const UpdateRunPayroll = lazy(() => import('../views/pages/payroll/run-payroll/UpdateRunPayroll'))
const Settings = lazy(() => import('../views/pages/settings/Settings'))
const Categories = lazy(() => import('../views/pages/settings/Categories'))
const Tax = lazy(() => import('../views/pages/settings/Tax/Tax'))
const CreateTax = lazy(() => import('../views/pages/settings/Tax/CreateTax'))
const UpdateTax = lazy(() => import('../views/pages/settings/Tax/UpdateTax'))
const Currency = lazy(() => import('../views/pages/settings/currency/Currency'))
const CreateCurrency = lazy(() => import('../views/pages/settings/currency/CreateCurrency'))
const UpdateCurrency = lazy(() => import('../views/pages/settings/currency/UpdateCurrency'))
const ExpenseCategory = lazy(() => import('../views/pages/settings/expense-category/ExpenseCategory'))
const CreateExpenseCategory = lazy(() => import('../views/pages/settings/expense-category/CreateExpenseCategory'))
const UpdateExpenseCategory = lazy(() => import('../views/pages/settings/expense-category/UpdateExpenseCategory'))
const IncomeCategory = lazy(() => import('../views/pages/settings/income-category/IncomeCategory'))
const CreateIncomeCategory = lazy(() => import('../views/pages/settings/income-category/CreateIncomeCategory'))
const UpdateIncomeCategory = lazy(() => import('../views/pages/settings/income-category/UpdateIncomeCategory'))
const CreateCompany = lazy(() => import('../views/pages/settings/company/CreateCompany'))
const UpdateCompany = lazy(() => import('../views/pages/settings/company/UpdateCompany'))
const PaymentMethod = lazy(() => import('../views/pages/settings/payment-method/PaymentMethod'))
const CreatePaymentMethod = lazy(() => import('../views/pages/settings/payment-method/CreatePaymentMethod'))
const UpdatePaymentMethod = lazy(() => import('../views/pages/settings/payment-method/UpdatePaymentMethod'))
const Contribution = lazy(() => import('../views/pages/settings/contribution/Contribution'))
const CreateContribution = lazy(() => import('../views/pages/settings/contribution/CreateContribution'))
const UpdateContribution = lazy(() => import('../views/pages/settings/contribution/UpdateContribution'))
const SalaryBenefit = lazy(() => import('../views/pages/settings/salary-benefit/SalaryBenefit'))
const CreateSalaryBenefit = lazy(() => import('../views/pages/settings/salary-benefit/CreateSalaryBenefit'))
const UpdateSalaryBenefit = lazy(() => import('../views/pages/settings/salary-benefit/UpdateSalaryBenefit'))
const Reports = lazy(() => import('../views/pages/reports/Reports'))
const BalanceSheet = lazy(() => import('../views/pages/reports/report-list/BalanceSheet'))
const ExpenseSummary = lazy(() => import('../views/pages/reports/report-list/ExpenseSummary'))
const IncomeSummary = lazy(() => import('../views/pages/reports/report-list/IncomeSummary'))
const IncomeVsExpenseSummary = lazy(() => import('../views/pages/reports/report-list/IncomeVsExpenseSummary'))
const TaxSummary = lazy(() => import('../views/pages/reports/report-list/TaxSummary'))


export const AUTH_ROUTES = [
    {
        path: PATH.FORGOT_PASSWORD,
        key: 'ForgotPasswordForm',
        icon: '',
        exact: true,
        component: ForgotPasswordForm,
        access: '',
        restricted: false
    },
    {
        path: PATH.LOGIN,
        key: 'LoginForm',
        icon: '',
        exact: true,
        component: LoginForm,
        access: '',
        restricted: false
    },
    {
        path: PATH.REGISTER,
        key: 'RegistrationForm',
        icon: '',
        exact: true,
        component: RegistrationForm,
        access: '',
        restricted: false
    },
    {
        path: PATH.RESET_PASSWORD,
        key: 'ResetPasswordForm',
        icon: '',
        exact: true,
        component: ResetPasswordForm,
        access: '',
        restricted: false
    },
];


export const EMAIL_VERIFICATION_ROUTES = [
    {
        path: PATH.EMAIL_VERIFICATION,
        key: 'EmailVerification',
        icon: '',
        exact: true,
        component: EmailVerification,
        access: '',
        restricted: true,
        
    },
    {
        path: PATH.EMAIL_VERIFIED,
        key: 'EmailVerified',
        icon: '',
        exact: true,
        component: EmailVerified,
        access: '',
        restricted: true,
        
    },
]


export const PRIVATE_ROUTES = [
    {
        path: PATH.MAIN_DASHBOARD,
        key: 'MainDashboard',
        icon: '',
        exact: true,
        component: MainDashboard,
        access: 'View Main Dashboard',
        restricted: true
    },
    {
        path: PATH.PAYROLL_DASHBOARD,
        key: 'PayrollDashboard',
        icon: '',
        exact: true,
        component: PayrollDashboard,
        access: 'View Payroll Dashboard',
        restricted: true
    },
    {
        path: PATH.DOUBLE_ENTRY_DASHBOARD,
        key: 'DoubleEntryDashboard',
        icon: '',
        exact: true,
        component: DoubleEntryDashboard,
        access: 'View Double Entry Dashboard',
        restricted: true
    },
    {
        path: PATH.CHART_OF_ACCOUNT_TYPE,
        key: 'ChartOfAccountType',
        icon: '',
        exact: true,
        component: ChartOfAccountType,
        access: 'Manage Chart of Account Types',
        restricted: true
    },
    {
        path: PATH.CREATE_CHART_OF_ACCOUNT_TYPE,
        key: 'CreateChartOfAccountType',
        icon: '',
        exact: true,
        component: CreateChartOfAccountType,
        access: 'Manage Chart of Account Types',
        restricted: true
    },
    {
        path: PATH.UPDATE_CHART_OF_ACCOUNT_TYPE,
        key: 'UpdateChartOfAccountType',
        icon: '',
        exact: true,
        component: UpdateChartOfAccountType,
        access: 'Manage Chart of Account Types',
        restricted: true
    },
    {
        path: PATH.CHART_OF_ACCOUNT,
        key: 'ChartOfAccount',
        icon: '',
        exact: true,
        component: ChartOfAccount,
        access: 'Manage Chart of Accounts',
        restricted: true
    },
    {
        path: PATH.CREATE_CHART_OF_ACCOUNT,
        key: 'CreateChartOfAccount',
        icon: '',
        exact: true,
        component: CreateChartOfAccount,
        access: 'Manage Chart of Accounts',
        restricted: true
    },
    {
        path: PATH.UPDATE_CHART_OF_ACCOUNT,
        key: 'UpdateChartOfAccount',
        icon: '',
        exact: true,
        component: UpdateChartOfAccount,
        access: 'Manage Chart of Accounts',
        restricted: true
    },
    {
        path: PATH.JOURNAL_ENTRY,
        key: 'JournalEntry',
        icon: '',
        exact: true,
        component: JournalEntry,
        access: 'Manage Journal Entries',
        restricted: true
    },
    {
        path: PATH.CREATE_JOURNAL_ENTRY,
        key: 'CreateJournalEntry',
        icon: '',
        exact: true,
        component: CreateJournalEntry,
        access: 'Manage Journal Entries',
        restricted: true
    },
    {
        path: PATH.UPDATE_JOURNAL_ENTRY,
        key: 'UpdateJournalEntry',
        icon: '',
        exact: true,
        component: UpdateJournalEntry,
        access: 'Manage Journal Entries',
        restricted: true
    },
    {
        path: PATH.ITEM,
        key: 'Item',
        icon: '',
        exact: true,
        component: Item,
        access: 'Manage Items',
        restricted: true
    },
    {
        path: PATH.CREATE_ITEM,
        key: 'CreateItem',
        icon: '',
        exact: true,
        component: CreateItem,
        access: 'Manage Items',
        restricted: true
    },
    {
        path: PATH.UPDATE_ITEM,
        key: 'UpdateItem',
        icon: '',
        exact: true,
        component: UpdateItem,
        access: 'Manage Items',
        restricted: true
    },
    {
        path: PATH.CATEGORY,
        key: 'Category',
        icon: '',
        exact: true,
        component: Category,
        access: 'Manage Categories',
        restricted: true
    },
    {
        path: PATH.CREATE_CATEGORY,
        key: 'CreateCategory',
        icon: '',
        exact: true,
        component: CreateCategory,
        access: 'Manage Categories',
        restricted: true
    },
    {
        path: PATH.UPDATE_CATEGORY,
        key: 'UpdateCategory',
        icon: '',
        exact: true,
        component: UpdateCategory,
        access: 'Manage Categories',
        restricted: true
    },
    {
        path: PATH.DISCOUNT,
        key: 'Discount',
        icon: '',
        exact: true,
        component: Discount,
        access: 'Manage Discounts',
        restricted: true
    },
    {
        path: PATH.CREATE_DISCOUNT,
        key: 'CreateDiscount',
        icon: '',
        exact: true,
        component: CreateDiscount,
        access: 'Manage Discounts',
        restricted: true
    },
    {
        path: PATH.UPDATE_DISCOUNT,
        key: 'UpdateDiscount',
        icon: '',
        exact: true,
        component: UpdateDiscount,
        access: 'Manage Discounts',
        restricted: true
    },
    {
        path: PATH.CUSTOMER,
        key: 'Customer',
        icon: '',
        exact: true,
        component: Customer,
        access: 'Manage Customers',
        restricted: true
    },
    {
        path: PATH.CREATE_CUSTOMER,
        key: 'CreateCustomer',
        icon: '',
        exact: true,
        component: CreateCustomer,
        access: 'Manage Customers',
        restricted: true
    },
    {
        path: PATH.UPDATE_CUSTOMER,
        key: 'UpdateCustomer',
        icon: '',
        exact: true,
        component: UpdateCustomer,
        access: 'Manage Customers',
        restricted: true
    },
    {
        path: PATH.INVOICE,
        key: 'Invoice',
        icon: '',
        exact: true,
        component: Invoice,
        access: 'Manage Invoices',
        restricted: true
    },
    {
        path: PATH.VIEW_INVOICE,
        key: 'ViewInvoice',
        icon: '',
        exact: true,
        component: ViewInvoice,
        access: 'Manage Invoices',
        restricted: true
    },
    {
        path: PATH.CREATE_INVOICE,
        key: 'CreateInvoice',
        icon: '',
        exact: true,
        component: CreateInvoice,
        access: 'Manage Invoices',
        restricted: true
    },
    {
        path: PATH.UPDATE_INVOICE,
        key: 'UpdateInvoice',
        icon: '',
        exact: true,
        component: UpdateInvoice,
        access: 'Manage Invoices',
        restricted: true
    },
    {
        path: PATH.REVENUE,
        key: 'Revenue',
        icon: '',
        exact: true,
        component: Revenue,
        access: 'Manage Revenues',
        restricted: true
    },
    {
        path: PATH.CREATE_REVENUE,
        key: 'CreateRevenue',
        icon: '',
        exact: true,
        component: CreateRevenue,
        access: 'Manage Revenues',
        restricted: true
    },
    {
        path: PATH.UPDATE_REVENUE,
        key: 'UpdateRevenue',
        icon: '',
        exact: true,
        component: UpdateRevenue,
        access: 'Manage Revenues',
        restricted: true
    },
    {
        path: PATH.SETTINGS,
        key: 'Settings',
        icon: '',
        exact: true,
        component: Settings,
        access: 'Manage Settings',
        restricted: true
    },
    {
        path: PATH.CATEGORIES,
        key: 'Categories',
        icon: '',
        exact: true,
        component: Categories,
        access: '',
        restricted: true
    },
    {
        path: PATH.INCOME_CATEGORY,
        key: 'IncomeCategory',
        icon: '',
        exact: true,
        component: IncomeCategory,
        access: 'Manage Income Categories',
        restricted: true
    },
    {
        path: PATH.CREATE_INCOME_CATEGORY,
        key: 'CreateIncomeCategory',
        icon: '',
        exact: true,
        component: CreateIncomeCategory,
        access: 'Manage Income Categories',
        restricted: true
    },
    {
        path: PATH.UPDATE_INCOME_CATEGORY,
        key: 'UpdateIncomeCategory',
        icon: '',
        exact: true,
        component: UpdateIncomeCategory,
        access: 'Manage Income Categories',
        restricted: true
    },
    {
        path: PATH.EXPENSE_CATEGORY,
        key: 'ExpenseCategory',
        icon: '',
        exact: true,
        component: ExpenseCategory,
        access: 'Manage Expense Categories',
        restricted: true
    },
    {
        path: PATH.CREATE_EXPENSE_CATEGORY,
        key: 'CreateExpenseCategory',
        icon: '',
        exact: true,
        component: CreateExpenseCategory,
        access: 'Manage Expense Categories',
        restricted: true
    },
    {
        path: PATH.UPDATE_EXPENSE_CATEGORY,
        key: 'UpdateExpenseCategory',
        icon: '',
        exact: true,
        component: UpdateExpenseCategory,
        access: 'Manage Expense Categories',
        restricted: true
    },
    {
        path: PATH.TAX,
        key: 'Tax',
        icon: '',
        exact: true,
        component: Tax,
        access: 'Manage Taxes',
        restricted: true
    },
    {
        path: PATH.CREATE_TAX,
        key: 'CreateTax',
        icon: '',
        exact: true,
        component: CreateTax,
        access: 'Manage Taxes',
        restricted: true
    },
    {
        path: PATH.UPDATE_TAX,
        key: 'UpdateTax',
        icon: '',
        exact: true,
        component: UpdateTax,
        access: 'Manage Taxes',
        restricted: true
    },
    {
        path: PATH.CURRENCY,
        key: 'Currency',
        icon: '',
        exact: true,
        component: Currency,
        access: 'Manage Currencies',
        restricted: true
    },
    {
        path: PATH.CREATE_CURRENCY,
        key: 'CreateCurrency',
        icon: '',
        exact: true,
        component: CreateCurrency,
        access: 'Manage Currencies',
        restricted: true
    },
    {
        path: PATH.UPDATE_CURRENCY,
        key: 'UpdateCurrency',
        icon: '',
        exact: true,
        component: UpdateCurrency,
        access: 'Manage Currencies',
        restricted: true
    },
    {
        path: PATH.CREATE_COMPANY,
        key: 'CreateCompany',
        icon: '',
        exact: true,
        component: CreateCompany,
        access: 'Manage Companies',
        restricted: true
    },
    {
        path: PATH.UPDATE_COMPANY,
        key: 'UpdateCompany',
        icon: '',
        exact: true,
        component: UpdateCompany,
        access: 'Manage Companies',
        restricted: true
    },
    {
        path: PATH.BILL,
        key: 'Bill',
        icon: '',
        exact: true,
        component: Bill,
        access: 'Manage Bills',
        restricted: true
    },
    {
        path: PATH.CREATE_BILL,
        key: 'CreateBill',
        icon: '',
        exact: true,
        component: CreateBill,
        access: 'Manage Bills',
        restricted: true
    },
    {
        path: PATH.VIEW_BILL,
        key: 'ViewBill',
        icon: '',
        exact: true,
        component: ViewBill,
        access: 'Manage Bills',
        restricted: true
    },
    {
        path: PATH.UPDATE_BILL,
        key: 'UpdateBill',
        icon: '',
        exact: true,
        component: UpdateBill,
        access: 'Manage Bills',
        restricted: true
    },
    {
        path: PATH.PAYMENT,
        key: 'Payment',
        icon: '',
        exact: true,
        component: Payment,
        access: 'Manage Payments',
        restricted: true
    },
    {
        path: PATH.CREATE_PAYMENT,
        key: 'CreatePayment',
        icon: '',
        exact: true,
        component: CreatePayment,
        access: 'Manage Payments',
        restricted: true
    },
    {
        path: PATH.UPDATE_PAYMENT,
        key: 'UpdatePayment',
        icon: '',
        exact: true,
        component: UpdatePayment,
        access: 'Manage Payments',
        restricted: true
    },
    {
        path: PATH.VENDOR,
        key: 'Vendor',
        icon: '',
        exact: true,
        component: Vendor,
        access: 'Manage Vendors',
        restricted: true
    },
    {
        path: PATH.CREATE_VENDOR,
        key: 'CreateVendor',
        icon: '',
        exact: true,
        component: CreateVendor,
        access: 'Manage Vendors',
        restricted: true
    },
    {
        path: PATH.UPDATE_VENDOR,
        key: 'UpdateVendor',
        icon: '',
        exact: true,
        component: UpdateVendor,
        access: 'Manage Vendors',
        restricted: true
    },
    {
        path: PATH.ACCOUNT,
        key: 'Account',
        icon: '',
        exact: true,
        component: Account,
        access: 'Manage Banking Accounts',
        restricted: true
    },
    {
        path: PATH.CREATE_ACCOUNT,
        key: 'CreateAccount',
        icon: '',
        exact: true,
        component: CreateAccount,
        access: 'Manage Banking Accounts',
        restricted: true
    },
    {
        path: PATH.UPDATE_ACCOUNT,
        key: 'UpdateAccount',
        icon: '',
        exact: true,
        component: UpdateAccount,
        access: 'Manage Banking Accounts',
        restricted: true
    },
    {
        path: PATH.BANK_ACCOUNT_TRANSFER,
        key: 'BankAccountTransfer',
        icon: '',
        exact: true,
        component: BankAccountTransfer,
        access: 'Manage Bank Account Transfers',
        restricted: true
    },
    {
        path: PATH.CREATE_BANK_ACCOUNT_TRANSFER,
        key: 'CreateBankAccountTransfer',
        icon: '',
        exact: true,
        component: CreateBankAccountTransfer,
        access: 'Manage Bank Account Transfers',
        restricted: true
    },
    {
        path: PATH.UPDATE_BANK_ACCOUNT_TRANSFER,
        key: 'UpdateBankAccountTransfer',
        icon: '',
        exact: true,
        component: UpdateBankAccountTransfer,
        access: 'Manage Bank Account Transfers',
        restricted: true
    },
    {
        path: PATH.BANK_ACCOUNT_RECONCILIATION,
        key: 'BankAccountReconciliation',
        icon: '',
        exact: true,
        component: BankAccountReconciliation,
        access: 'Manage Bank Account Reconciliations',
        restricted: true
    },
    {
        path: PATH.CREATE_BANK_ACCOUNT_RECONCILIATION,
        key: 'CreateBankAccountReconciliation',
        icon: '',
        exact: true,
        component: CreateBankAccountReconciliation,
        access: 'Manage Bank Account Reconciliations',
        restricted: true
    },
    {
        path: PATH.UPDATE_BANK_ACCOUNT_RECONCILIATION,
        key: 'UpdateBankAccountReconciliation',
        icon: '',
        exact: true,
        component: UpdateBankAccountReconciliation,
        access: 'Manage Bank Account Reconciliations',
        restricted: true
    },
    {
        path: PATH.TRANSACTION,
        key: 'Transaction',
        icon: '',
        exact: true,
        component: Transaction,
        access: 'View Transactions',
        restricted: true
    },
    {
        path: PATH.PAYMENT_METHOD,
        key: 'PaymentMethod',
        icon: '',
        exact: true,
        component: PaymentMethod,
        access: 'Manage Payment Methods',
        restricted: true
    },
    {
        path: PATH.CREATE_PAYMENT_METHOD,
        key: 'CreatePaymentMethod',
        icon: '',
        exact: true,
        component: CreatePaymentMethod,
        access: 'Manage Payment Methods',
        restricted: true
    },
    {
        path: PATH.UPDATE_PAYMENT_METHOD,
        key: 'UpdatePaymentMethod',
        icon: '',
        exact: true,
        component: UpdatePaymentMethod,
        access: 'Manage Payment Methods',
        restricted: true
    },
    {
        path: PATH.CONTRIBUTION,
        key: 'Contribution',
        icon: '',
        exact: true,
        component: Contribution,
        access: 'Manage Contributions',
        restricted: true
    },
    {
        path: PATH.CREATE_CONTRIBUTION,
        key: 'CreateContribution',
        icon: '',
        exact: true,
        component: CreateContribution,
        access: 'Manage Contributions',
        restricted: true
    },
    {
        path: PATH.UPDATE_CONTRIBUTION,
        key: 'UpdateContribution',
        icon: '',
        exact: true,
        component: UpdateContribution,
        access: 'Manage Contributions',
        restricted: true
    },
    {
        path: PATH.SALARY_BENEFIT,
        key: 'SalaryBenefit',
        icon: '',
        exact: true,
        component: SalaryBenefit,
        access: 'Manage Salary Benefits',
        restricted: true
    },
    {
        path: PATH.CREATE_SALARY_BENEFIT,
        key: 'CreateSalaryBenefit',
        icon: '',
        exact: true,
        component: CreateSalaryBenefit,
        access: 'Manage Salary Benefits',
        restricted: true
    },
    {
        path: PATH.UPDATE_SALARY_BENEFIT,
        key: 'UpdateSalaryBenefit',
        icon: '',
        exact: true,
        component: UpdateSalaryBenefit,
        access: 'Manage Salary Benefits',
        restricted: true
    },
    {
        path: PATH.WAREHOUSE,
        key: 'Warehouse',
        icon: '',
        exact: true,
        component: Warehouse,
        access: 'Manage Warehouses',
        restricted: true
    },
    {
        path: PATH.VIEW_WAREHOUSE,
        key: 'ViewWarehouse',
        icon: '',
        exact: true,
        component: ViewWarehouse,
        access: 'Manage Warehouses',
        restricted: true
    },
    {
        path: PATH.CREATE_WAREHOUSE,
        key: 'CreateWarehouse',
        icon: '',
        exact: true,
        component: CreateWarehouse,
        access: 'Manage Warehouses',
        restricted: true
    },
    {
        path: PATH.UPDATE_WAREHOUSE,
        key: 'UpdateWarehouse',
        icon: '',
        exact: true,
        component: UpdateWarehouse,
        access: 'Manage Warehouses',
        restricted: true
    },
    {
        path: PATH.STOCK_ADJUSTMENT,
        key: 'StockAdjustment',
        icon: '',
        exact: true,
        component: StockAdjustment,
        access: 'Manage Stock Adjustments',
        restricted: true
    },
    {
        path: PATH.CREATE_STOCK_ADJUSTMENT,
        key: 'CreateStockAdjustment',
        icon: '',
        exact: true,
        component: CreateStockAdjustment,
        access: 'Manage Stock Adjustments',
        restricted: true
    },
    {
        path: PATH.VIEW_STOCK_ADJUSTMENT,
        key: 'ViewStockAdjustment',
        icon: '',
        exact: true,
        component: ViewStockAdjustment,
        access: 'Manage Stock Adjustments',
        restricted: true
    },
    {
        path: PATH.EMPLOYEE,
        key: 'Employee',
        icon: '',
        exact: true,
        component: Employee,
        access: 'Manage Employees',
        restricted: true
    },
    {
        path: PATH.CREATE_EMPLOYEE,
        key: 'CreateEmployee',
        icon: '',
        exact: true,
        component: CreateEmployee,
        access: 'Manage Employees',
        restricted: true
    },
    {
        path: PATH.VIEW_EMPLOYEE,
        key: 'ViewEmployee',
        icon: '',
        exact: true,
        component: ViewEmployee,
        access: 'Manage Employees',
        restricted: true
    },
    {
        path: PATH.UPDATE_EMPLOYEE,
        key: 'UpdateEmployee',
        icon: '',
        exact: true,
        component: UpdateEmployee,
        access: 'Manage Employees',
        restricted: true
    },
    {
        path: PATH.PAY_CALENDAR,
        key: 'PayCalendar',
        icon: '',
        exact: true,
        component: PayCalendar,
        access: 'Manage Pay Calendars',
        restricted: true
    },
    {
        path: PATH.CREATE_PAY_CALENDAR,
        key: 'CreatePayCalendar',
        icon: '',
        exact: true,
        component: CreatePayCalendar,
        access: 'Manage Pay Calendars',
        restricted: true
    },
    {
        path: PATH.UPDATE_PAY_CALENDAR,
        key: 'UpdatePayCalendar',
        icon: '',
        exact: true,
        component: UpdatePayCalendar,
        access: 'Manage Pay Calendars',
        restricted: true
    },
    {
        path: PATH.RUN_PAYROLL,
        key: 'RunPayroll',
        icon: '',
        exact: true,
        component: RunPayroll,
        access: 'Manage Payrolls',
        restricted: true
    },
    {
        path: PATH.CREATE_RUN_PAYROLL,
        key: 'CreateRunPayroll',
        icon: '',
        exact: true,
        component: CreateRunPayroll,
        access: 'Manage Payrolls',
        restricted: true
    },
    {
        path: PATH.UPDATE_RUN_PAYROLL,
        key: 'UpdateRunPayroll',
        icon: '',
        exact: true,
        component: UpdateRunPayroll,
        access: 'Manage Payrolls',
        restricted: true
    },
    {
        path: PATH.REPORTS,
        key: 'Reports',
        icon: '',
        exact: true,
        component: Reports,
        access: '',
        restricted: true
    },
    {
        path: PATH.ACCOUNTING_REPORT_BALANCE_SHEET,
        key: 'BalanceSheet',
        icon: '',
        exact: true,
        component: BalanceSheet,
        access: 'View Balance Sheet',
        restricted: true
    },
    {
        path: PATH.REPORT_EXPENSE_SUMMARY,
        key: 'ExpenseSummary',
        icon: '',
        exact: true,
        component: ExpenseSummary,
        access: 'View Expense Summary',
        restricted: true
    },
    {
        path: PATH.REPORT_INCOME_SUMMARY,
        key: 'IncomeSummary',
        icon: '',
        exact: true,
        component: IncomeSummary,
        access: 'View Income Summary',
        restricted: true
    },
    {
        path: PATH.REPORT_INCOME_VS_EXPENSE_SUMMARY,
        key: 'IncomeVsExpenseSummary',
        icon: '',
        exact: true,
        component: IncomeVsExpenseSummary,
        access: 'View Income vs Expense Summary',
        restricted: true
    },
    {
        path: PATH.ACCOUNTING_REPORT_TAX_SUMMARY,
        key: 'TaxSummary',
        icon: '',
        exact: true,
        component: TaxSummary,
        access: 'View Tax Summary',
        restricted: true
    },
];
