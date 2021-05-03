/** Libraries */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

/** Module Reducers */
import alertReducer from './modules/alert/reducer'
import authReducer from './modules/auth/reducer'
import chartOfAccountTypeReducer from './modules/chart-of-account-type/reducer'
import chartOfAccountReducer from './modules/chart-of-account/reducer'
import journalEntryReducer from './modules/journal-entry/reducer'
import itemReducer from './modules/item/reducer'
import categoryReducer from './modules/category/reducer'
import discountReducer from './modules/discount/reducer'
import taxReducer from './modules/tax/reducer'
import currencyReducer from './modules/currency/reducer'
import companyReducer from './modules/company/reducer'
import incomeCategoryReducer from './modules/income-category/reducer'
import expenseCategoryReducer from './modules/expense-category/reducer'
import mainLayoutReducer from './modules/main-layout/reducer'


const rootReducer = (history) => combineReducers({
    /** Global reducers */
    router: connectRouter(history),
    alert: alertReducer,

    /** reducers */
    auth: authReducer,
    chartOfAccountType: chartOfAccountTypeReducer,
    chartOfAccount: chartOfAccountReducer,
    journalEntry: journalEntryReducer,
    item: itemReducer,
    category: categoryReducer,
    discount: discountReducer,
    tax: taxReducer,
    currency: currencyReducer,
    company: companyReducer,
    incomeCategory: incomeCategoryReducer,
    expenseCategory: expenseCategoryReducer,
    mainLayout: mainLayoutReducer
});

export default rootReducer;