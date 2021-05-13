import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/access-right/access.right';

/** Actions */
import { 
    getAccessRightsSuccess, 
    getAccessRightsFailed, 
    destroyAccessRightsSuccess, 
    destroyAccessRightsFailed, 
    createAccessRightSuccess, 
    createAccessRightFailed, 
    updateAccessRightSuccess, 
    updateAccessRightFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_ACCESS_RIGHTS_START,
    CREATE_ACCESS_RIGHT_START,
    UPDATE_ACCESS_RIGHT_START,
    DESTROY_ACCESS_RIGHTS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchAccessRightsSaga (payload)
{
    try {
        const { status, message, data: accessRights } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getAccessRightsSuccess({ accessRights }));
        }

    } catch ({ message }) {
        yield put(getAccessRightsFailed({ errorMessages: message }));
    }
}


function* createAccessRightSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createAccessRightSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.ACCESS_RIGHT));
        }

    } catch ({ message }) {
        yield put(createAccessRightFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateAccessRightSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateAccessRightSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.ACCESS_RIGHT));
        }

    } catch ({ message }) {
        yield put(updateAccessRightFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyAccessRightsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyAccessRightsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyAccessRightsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchAccessRightsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_ACCESS_RIGHTS_START);

        yield call(fetchAccessRightsSaga, payload);
    }
}

function* createAccessRightWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_ACCESS_RIGHT_START);

        yield call(createAccessRightSaga, payload);
    }
}

function* updateAccessRightWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_ACCESS_RIGHT_START);

        yield call(updateAccessRightSaga, payload);
    }
}

function* destroyAccessRightsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_ACCESS_RIGHTS_START);

        yield call(destroyAccessRightsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchAccessRightsWatcher(),
        createAccessRightWatcher(),
        updateAccessRightWatcher(),
        destroyAccessRightsWatcher()
    ]);
 }