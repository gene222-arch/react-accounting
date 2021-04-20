import { all } from 'redux-saga/effects'

/** Module sagas */
import authSaga from '../redux/modules/auth/saga'
import chartOfAccountTypeSaga from '../redux/modules/chart-of-account-type/saga'

export default function* () 
{
    yield all([
        authSaga(),
        chartOfAccountTypeSaga()
    ]);
}

