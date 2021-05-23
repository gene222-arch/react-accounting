import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { findAsync, updateAsync } from '../../../services/settings/default.settings';

/** Actions */
import {  
    getDefaultSettingsSuccess,
    getDefaultSettingsFailed,
    updateDefaultSettingsSuccess, 
    updateDefaultSettingsFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_DEFAULT_SETTINGS_START,
    UPDATE_DEFAULT_SETTINGS_START,
} = ACTION_TYPES;

/**
 * Sagas
 */
function* getDefaultSettingsSaga ()
{
    try {
        const { status, message, data: defaultSettings } = yield call(findAsync);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(getDefaultSettingsSuccess({ defaultSettings }));
        }

    } catch ({ message }) {
        yield put(updateDefaultSettingsFailed({ errorMessages: message }));
    }
}

function* updateDefaultSettingsSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateDefaultSettingsSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.DEFAULT_SETTINGS));
        }

    } catch ({ message }) {
        yield put(updateDefaultSettingsFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

/**
 * Watchers or Observers
 */
function* getDefaultSettingsWatcher ()
{
    while (true) 
    {
        yield take(GET_DEFAULT_SETTINGS_START);

        yield call(getDefaultSettingsSaga);
    }
}

function* updateDefaultSettingsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_DEFAULT_SETTINGS_START);

        yield call(updateDefaultSettingsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        getDefaultSettingsWatcher(),
        updateDefaultSettingsWatcher()
    ]);
 }