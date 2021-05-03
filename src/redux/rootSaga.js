import { all } from 'redux-saga/effects'

/** Module sagas */
import authSaga from '../redux/modules/auth/saga'
import chartOfAccountTypeSaga from '../redux/modules/chart-of-account-type/saga'
import chartOfAccountSaga from '../redux/modules/chart-of-account/saga'
import itemSaga from '../redux/modules/item/saga'
import categorySaga from '../redux/modules/category/saga'
import discountSaga from '../redux/modules/discount/saga'
import taxSaga from '../redux/modules/tax/saga'
import currencySaga from '../redux/modules/currency/saga'
import incomeCategorySaga from '../redux/modules/income-category/saga'
import expenseCategorySaga from '../redux/modules/expense-category/saga'
import companySaga from '../redux/modules/company/saga'
import vendorSaga from '../redux/modules/vendor/saga'
import journalEntrySaga from '../redux/modules/journal-entry/saga'

export default function* () 
{
    yield all([
        authSaga(),
        chartOfAccountTypeSaga(),
        chartOfAccountSaga(),
        currencySaga(),
        companySaga(),
        journalEntrySaga(),
        itemSaga(),
        discountSaga(),
        categorySaga(),
        incomeCategorySaga(),
        expenseCategorySaga(),
        taxSaga(),
        vendorSaga()
    ]);
}

