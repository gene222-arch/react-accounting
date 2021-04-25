import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/double-entry/chart.of.account.type';

/** Actions */
import { 
    getChartOfAccountTypesSuccess, 
    getChartOfAccountTypesFailed, 
    destroyChartOfAccountTypesSuccess, 
    destroyChartOfAccountTypesFailed, 
    createChartOfAccountTypeSuccess, 
    createChartOfAccountTypeFailed, 
    updateChartOfAccountTypeSuccess, 
    updateChartOfAccountTypeFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';


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

        if (status !== 'success') {
        }
        
        if (status === 'success') {
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

        if (status !== 'success') {
        }

        if (status === 'success') {

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(createChartOfAccountTypeSuccess(payload));

            yield put(push(PATH.CHART_OF_ACCOUNT_TYPE));
        }

    } catch ({ message }) {
        yield put(createChartOfAccountTypeFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateChartOfAccountTypeSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') { 

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(updateChartOfAccountTypeSuccess(payload));
            
            yield put(push(PATH.CHART_OF_ACCOUNT_TYPE));
        }

    } catch ({ message }) {
        yield put(updateChartOfAccountTypeFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyChartOfAccountTypesSaga (payload)
{
    try {
        const { data, message, status } = yield call(destroyAsync, payload);

        yield put(ALERT.showAlert({
            status, 
            message
        }));
        
        yield put(destroyChartOfAccountTypesSuccess(payload));

    } catch ({ message }) {
        yield put(destroyChartOfAccountTypesFailed({ errorMessages: message }));
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

function* createChartOfAccountTypeWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_CHART_OF_ACCOUNT_TYPE_START);

        yield call(createChartOfAccountTypeSaga, payload);
    }
}

function* updateChartOfAccountTypeWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_CHART_OF_ACCOUNT_TYPE_START);

        yield call(updateChartOfAccountTypeSaga, payload);
    }
}

function* destroyChartOfAccountTypesWatcher ()
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
        createChartOfAccountTypeWatcher(),
        updateChartOfAccountTypeWatcher(),
        destroyChartOfAccountTypesWatcher()
    ]);
}

