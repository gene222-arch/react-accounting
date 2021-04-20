import { put, take, call, all } from 'redux-saga/effects';
/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchChartOfAccountTypesAsync } from '../../../services/double-entry/chart.of.account.types';

/** Actions */
import { getChartOfAccountTypesSuccess, getChartOfAccountTypesFailed } from './actions';


const {
    GET_CHART_OF_ACCOUNT_TYPES_START,
} = ACTION_TYPES;


function* fetchChartOfAccountTypesSaga ()
{
    try {
        const { status, message, data } = yield call(fetchChartOfAccountTypesAsync);

        console.log(data);

        if (status === 'success')
        {
            yield put(getChartOfAccountTypesSuccess({ chartOfAccountTypes: data }));
        }

    } catch ({ messages }) {
        yield put(getChartOfAccountTypesFailed({ errorMessages: messages }));
    }
}

function* fetchChartOfAccountTypesWatcher ()
{
    while (true) 
    {
        yield take(GET_CHART_OF_ACCOUNT_TYPES_START);

        yield call(fetchChartOfAccountTypesSaga);
    }
}

/**
 * 
 */
export default function* ()
{
    yield all([
        fetchChartOfAccountTypesWatcher()
    ]);
}

