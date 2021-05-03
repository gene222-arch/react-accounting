import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/settings/income.category';

/** Actions */
import { 
    getIncomeCategoriesSuccess, 
    getIncomeCategoriesFailed, 
    destroyIncomeCategoriesSuccess, 
    destroyIncomeCategoriesFailed, 
    createIncomeCategorySuccess, 
    createIncomeCategoryFailed, 
    updateIncomeCategorySuccess, 
    updateIncomeCategoryFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_INCOME_CATEGORIES_START,
    CREATE_INCOME_CATEGORY_START,
    UPDATE_INCOME_CATEGORY_START,
    DESTROY_INCOME_CATEGORIES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchIncomeCategoriesSaga (payload)
{
    try {
        const { status, message, data: incomeCategories } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getIncomeCategoriesSuccess({ incomeCategories }));
        }

    } catch ({ message }) {
        yield put(getIncomeCategoriesFailed({ errorMessages: message }));
    }
}


function* createIncomeCategorySaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createIncomeCategorySuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.INCOME_CATEGORY));
        }

    } catch ({ message }) {
        yield put(createIncomeCategoryFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateIncomeCategorySaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateIncomeCategorySuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.INCOME_CATEGORY));
        }

    } catch ({ message }) {
        yield put(updateIncomeCategoryFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyIncomeCategoriesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyIncomeCategoriesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyIncomeCategoriesFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchIncomeCategoriesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_INCOME_CATEGORIES_START);

        yield call(fetchIncomeCategoriesSaga, payload);
    }
}

function* createIncomeCategoryWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_INCOME_CATEGORY_START);

        yield call(createIncomeCategorySaga, payload);
    }
}

function* updateIncomeCategoryWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_INCOME_CATEGORY_START);

        yield call(updateIncomeCategorySaga, payload);
    }
}

function* destroyIncomeCategoriesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_INCOME_CATEGORIES_START);

        yield call(destroyIncomeCategoriesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchIncomeCategoriesWatcher(),
        createIncomeCategoryWatcher(),
        updateIncomeCategoryWatcher(),
        destroyIncomeCategoriesWatcher()
    ]);
 }