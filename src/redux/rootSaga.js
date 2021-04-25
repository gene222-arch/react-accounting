import { all } from 'redux-saga/effects'

/** Module sagas */
import authSaga from '../redux/modules/auth/saga'
import chartOfAccountTypeSaga from '../redux/modules/chart-of-account-type/saga'
import chartOfAccountSaga from '../redux/modules/chart-of-account/saga'
import itemSaga from '../redux/modules/item/saga'
import journalEntrySaga from '../redux/modules/journal-entry/saga'

export default function* () 
{
    yield all([
        authSaga(),
        chartOfAccountTypeSaga(),
        chartOfAccountSaga(),
        journalEntrySaga(),
        itemSaga()
    ]);
}

