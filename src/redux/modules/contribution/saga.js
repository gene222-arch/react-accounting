import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/settings/contribution';

/** Actions */
import { 
    getContributionsSuccess, 
    getContributionsFailed, 
    destroyContributionsSuccess, 
    destroyContributionsFailed, 
    createContributionSuccess, 
    createContributionFailed, 
    updateContributionSuccess, 
    updateContributionFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_CONTRIBUTIONS_START,
    CREATE_CONTRIBUTION_START,
    UPDATE_CONTRIBUTION_START,
    DESTROY_CONTRIBUTIONS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchContributionsSaga (payload)
{
    try {
        const { status, message, data: contributions } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getContributionsSuccess({ contributions }));
        }

    } catch ({ message }) {
        yield put(getContributionsFailed({ errorMessages: message }));
    }
}


function* createContributionSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createContributionSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.CONTRIBUTION));
        }

    } catch ({ message }) {
        yield put(createContributionFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateContributionSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateContributionSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.CONTRIBUTION));
        }

    } catch ({ message }) {
        yield put(updateContributionFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyContributionsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyContributionsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyContributionsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchContributionsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_CONTRIBUTIONS_START);

        yield call(fetchContributionsSaga, payload);
    }
}

function* createContributionWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_CONTRIBUTION_START);

        yield call(createContributionSaga, payload);
    }
}

function* updateContributionWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_CONTRIBUTION_START);

        yield call(updateContributionSaga, payload);
    }
}

function* destroyContributionsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_CONTRIBUTIONS_START);

        yield call(destroyContributionsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchContributionsWatcher(),
        createContributionWatcher(),
        updateContributionWatcher(),
        destroyContributionsWatcher()
    ]);
 }