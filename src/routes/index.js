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
const Vendor = lazy(() => import('../views/pages/purchases/vendor/Vendor'))
const CreateVendor = lazy(() => import('../views/pages/purchases/vendor/CreateVendor'))
const UpdateVendor = lazy(() => import('../views/pages/purchases/vendor/UpdateVendor'))
const Account = lazy(() => import('../views/pages/banking/account/Account'))
const CreateAccount = lazy(() => import('../views/pages/banking/account/CreateAccount'))
const UpdateAccount = lazy(() => import('../views/pages/banking/account/UpdateAccount'))
const PaymentMethod = lazy(() => import('../views/pages/settings/payment-method/PaymentMethod'))
const CreatePaymentMethod = lazy(() => import('../views/pages/settings/payment-method/CreatePaymentMethod'))
const UpdatePaymentMethod = lazy(() => import('../views/pages/settings/payment-method/UpdatePaymentMethod'))



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
];
