import { all } from 'redux-saga/effects'

/** Module sagas */
import authSaga from './modules/auth/saga'
import accountSaga from './modules/account/saga'
import chartOfAccountTypeSaga from './modules/chart-of-account-type/saga'
import chartOfAccountSaga from './modules/chart-of-account/saga'
import itemSaga from './modules/item/saga'
import categorySaga from './modules/category/saga'
import discountSaga from './modules/discount/saga'
import customerSaga from './modules/customer/saga'
import invoiceSaga from './modules/invoice/saga'
import revenueSaga from './modules/revenue/saga'
import taxSaga from './modules/tax/saga'
import currencySaga from './modules/currency/saga'
import incomeCategorySaga from './modules/income-category/saga'
import expenseCategorySaga from './modules/expense-category/saga'
import paymentMethodSaga from './modules/payment-method/saga'
import companySaga from './modules/company/saga'
import vendorSaga from './modules/vendor/saga'
import warehouseSaga from './modules/warehouse/saga'
import journalEntrySaga from './modules/journal-entry/saga'

export default function* () 
{
    yield all([
        authSaga(),
        accountSaga(),
        chartOfAccountTypeSaga(),
        chartOfAccountSaga(),
        currencySaga(),
        companySaga(),
        journalEntrySaga(),
        itemSaga(),
        discountSaga(),
        customerSaga(),
        invoiceSaga(),
        revenueSaga(),
        categorySaga(),
        incomeCategorySaga(),
        expenseCategorySaga(),
        paymentMethodSaga(),
        taxSaga(),
        warehouseSaga(),
        vendorSaga()
    ]);
}

