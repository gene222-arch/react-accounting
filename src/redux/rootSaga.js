import { all } from 'redux-saga/effects'

/** Module sagas */
import authSaga from '../redux/modules/auth/saga'
import accountSaga from '../redux/modules/account/saga'
import chartOfAccountTypeSaga from '../redux/modules/chart-of-account-type/saga'
import chartOfAccountSaga from '../redux/modules/chart-of-account/saga'
import itemSaga from '../redux/modules/item/saga'
import categorySaga from '../redux/modules/category/saga'
import discountSaga from '../redux/modules/discount/saga'
import customerSaga from '../redux/modules/customer/saga'
import invoiceSaga from '../redux/modules/invoice/saga'
import revenueSaga from '../redux/modules/revenue/saga'
import taxSaga from '../redux/modules/tax/saga'
import currencySaga from '../redux/modules/currency/saga'
import incomeCategorySaga from '../redux/modules/income-category/saga'
import expenseCategorySaga from '../redux/modules/expense-category/saga'
import paymentMethodSaga from '../redux/modules/payment-method/saga'
import companySaga from '../redux/modules/company/saga'
import vendorSaga from '../redux/modules/vendor/saga'
import journalEntrySaga from '../redux/modules/journal-entry/saga'

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
        vendorSaga()
    ]);
}

