import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/access-right/access.right';
import { fetchRolesAsync } from '../../../services/access-right/role';
import { fetchPermissionsAsync } from '../../../services/access-right/permission';


/** Actions */
import { 
    getAccessRightsSuccess, 
    getAccessRightsFailed, 
    getPermissionsSuccess, 
    getPermissionsFailed, 
    getRolesSuccess, 
    getRolesFailed, 
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
    GET_PERMISSIONS_START,
    GET_ROLES_START,
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

function* fetchPermissionsSaga ()
{
    try {
        const { status, message, data: permissions } = yield call(fetchPermissionsAsync);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getPermissionsSuccess({ permissions }));
        }

    } catch ({ message }) {
        yield put(getPermissionsFailed({ errorMessages: message }));
    }
}

function* fetchRolesSaga (payload)
{
    try {
        const { status, message, data: roles } = yield call(fetchRolesAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getRolesSuccess({ roles }));
        }

    } catch ({ message }) {
        yield put(getRolesFailed({ errorMessages: message }));
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

function* fetchRolesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_ROLES_START);

        yield call(fetchRolesSaga, payload);
    }
}

function* fetchPermissionsWatcher ()
{
    while (true) 
    {
        yield take(GET_PERMISSIONS_START);

        yield call(fetchPermissionsSaga);
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
        fetchPermissionsWatcher(),
        fetchRolesWatcher(),
        createAccessRightWatcher(),
        updateAccessRightWatcher(),
        destroyAccessRightsWatcher()
    ]);
 }