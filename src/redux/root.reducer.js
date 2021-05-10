/** Libraries */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

/** Module Reducers */
import alertReducer from './modules/alert/reducer'
import authReducer from './modules/auth/reducer'
import accountReducer from './modules/account/reducer'
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
import paymentMethodReducer from './modules/payment-method/reducer'
import vendorReducer from './modules/vendor/reducer'
import warehouseReducer from './modules/warehouse/reducer'
import mainLayoutReducer from './modules/main-layout/reducer'


const rootReducer = (history) => combineReducers({
    /** Global reducers */
    router: connectRouter(history),
    alert: alertReducer,

    /** reducers */
    auth: authReducer,
    account: accountReducer,
    chartOfAccountType: chartOfAccountTypeReducer,
    chartOfAccount: chartOfAccountReducer,
    journalEntry: journalEntryReducer,
    item: itemReducer,
    category: categoryReducer,
    discount: discountReducer,
    customer: customerReducer,
    invoice: invoiceReducer,
    revenue: revenueReducer,
    tax: taxReducer,
    currency: currencyReducer,
    company: companyReducer,
    incomeCategory: incomeCategoryReducer,
    expenseCategory: expenseCategoryReducer,
    paymentMethod: paymentMethodReducer,
    vendor: vendorReducer,
    warehouse: warehouseReducer,
    mainLayout: mainLayoutReducer
});

export default rootReducer;