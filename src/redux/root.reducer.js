/** Libraries */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

/** Module Reducers */
import alertReducer from './modules/alert/reducer'
import authReducer from './modules/auth/reducer'
import accessRightReducer from './modules/access-right/reducer'
import accountReducer from './modules/account/reducer'
import bankAccountTransferReducer from './modules/bank-account-transfer/reducer'
import bankAccountReconciliationReducer from './modules/bank-account-reconciliation/reducer'
import chartOfAccountTypeReducer from './modules/chart-of-account-type/reducer'
import chartOfAccountReducer from './modules/chart-of-account/reducer'
import journalEntryReducer from './modules/journal-entry/reducer'
import itemReducer from './modules/item/reducer'
import categoryReducer from './modules/category/reducer'
import discountReducer from './modules/discount/reducer'
import customerReducer from './modules/customer/reducer'
import invoiceReducer from './modules/invoice/reducer'
import revenueReducer from './modules/revenue/reducer'
import taxReducer from './modules/tax/reducer'
import currencyReducer from './modules/currency/reducer'
import companyReducer from './modules/company/reducer'
import incomeCategoryReducer from './modules/income-category/reducer'
import expenseCategoryReducer from './modules/expense-category/reducer'
import contributionReducer from './modules/contribution/reducer'
import salaryBenefitReducer from './modules/salary-benefit/reducer'
import paymentMethodReducer from './modules/payment-method/reducer'
import defaultSettingsReducer from './modules/default-settings/reducer'
import vendorReducer from './modules/vendor/reducer'
import billReducer from './modules/bill/reducer'
import paymentReducer from './modules/payment/reducer'
import stockAdjustmentReducer from './modules/stock-adjustment/reducer'
import warehouseReducer from './modules/warehouse/reducer'
import mainLayoutReducer from './modules/main-layout/reducer'
import payCalendarReducer from './modules/pay-calendar/reducer'
import runPayrollReducer from './modules/run-payroll/reducer'
import employeeReducer from './modules/employee/reducer'


const rootReducer = (history) => combineReducers({
    /** Global reducers */
    router: connectRouter(history),
    alert: alertReducer,

    /** reducers */
    auth: authReducer,
    accessRight: accessRightReducer,
    account: accountReducer,
    bankAccountTransfer: bankAccountTransferReducer,
    bankAccountReconciliation: bankAccountReconciliationReducer,
    chartOfAccountType: chartOfAccountTypeReducer,
    chartOfAccount: chartOfAccountReducer,
    journalEntry: journalEntryReducer,
    item: itemReducer,
    category: categoryReducer,
    discount: discountReducer,
    customer: customerReducer,
    invoice: invoiceReducer,
    revenue: revenueReducer,

    /** Settings */
    tax: taxReducer,
    currency: currencyReducer,
    company: companyReducer,
    defaultSettings: defaultSettingsReducer,
    incomeCategory: incomeCategoryReducer,
    expenseCategory: expenseCategoryReducer,
    paymentMethod: paymentMethodReducer,
    contribution: contributionReducer,
    salaryBenefit: salaryBenefitReducer,
    
    vendor: vendorReducer,
    bill: billReducer,
    payment: paymentReducer,
    stockAdjustment: stockAdjustmentReducer,
    warehouse: warehouseReducer,
    mainLayout: mainLayoutReducer,
    payCalendar: payCalendarReducer,
    runPayroll: runPayrollReducer,
    employee: employeeReducer
});

export default rootReducer;