import { put, take, call, all } from 'redux-saga/effects';
/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/double-entry/chart.of.account.types';

/** Actions */
import { 
    getChartOfAccountTypesSuccess, 
    getChartOfAccountTypesFailed, 
    destroyChartOfAccountTypeSuccess, 
    destroyChartOfAccountTypeFailed, 
    updateChartOfAccountTypeSuccess, 
    createChartOfAccountTypeSuccess, 
    createChartOfAccountTypeFailed, 
    updateChartOfAccountTypeFailed 
} from './actions';
import * as ALERT from './../alert/actions';

const {
    GET_CHART_OF_ACCOUNT_TYPES_START,
    CREATE_CHART_OF_ACCOUNT_TYPE_START,
    UPDATE_CHART_OF_ACCOUNT_TYPE_START,
    DESTROY_CHART_OF_ACCOUNT_TYPES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchChartOfAccountTypesSaga ()
{
    try {
        const { status, message, data } = yield call(fetchAllAsync);

        console.log(data);

        if (status === 'success')
        {
            yield put(getChartOfAccountTypesSuccess({ chartOfAccountTypes: data }));
        }

    } catch ({ message }) {
        yield put(getChartOfAccountTypesFailed({ errorMessages: message }));
    }
}


function* createChartOfAccountTypeSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success')
        {

        }
        else 
        {
            yield put(createChartOfAccountTypeSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(createChartOfAccountTypeFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: 'Could not save the data, please fix the problem.'
        }));
    }
}

function* updateChartOfAccountTypeSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success')
        {
        }
        else 
        {
            yield put(updateChartOfAccountTypeSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));
        }

    } catch ({ message }) {
        yield put(updateChartOfAccountTypeFailed({ errorMessages: message }));
    }
}

function* destroyChartOfAccountTypesSaga (payload)
{
        try {
            yield put(destroyChartOfAccountTypeSuccess({ ids: payload.ids }));

            const { status, message, data } = yield call(destroyAsync, payload);

    } catch ({ message }) {
        yield put(destroyChartOfAccountTypeFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchChartOfAccountTypesWatcher ()
{
    while (true) 
    {
        yield take(GET_CHART_OF_ACCOUNT_TYPES_START);

        yield call(fetchChartOfAccountTypesSaga);
    }
}

function* createChartOfAccountTypesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_CHART_OF_ACCOUNT_TYPE_START);

        yield call(createChartOfAccountTypeSaga, payload);
    }
}

function* updateChartOfAccountTypesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_CHART_OF_ACCOUNT_TYPE_START);

        yield call(updateChartOfAccountTypeSaga, payload);
    }
}

function* deleteChartOfAccountTypesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_CHART_OF_ACCOUNT_TYPES_START);

        yield call(destroyChartOfAccountTypesSaga, payload);
    }
}


/**
 * 
 */
export default function* ()
{
    yield all([
        fetchChartOfAccountTypesWatcher(),
        createChartOfAccountTypesWatcher(),
        updateChartOfAccountTypesWatcher(),
        deleteChartOfAccountTypesWatcher()
    ]);
}

