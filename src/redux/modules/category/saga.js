import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/items/category';

/** Actions */
import { 
    getCategoriesSuccess, 
    getCategoriesFailed, 
    destroyCategoriesSuccess, 
    destroyCategoriesFailed, 
    createCategorySuccess, 
    createCategoryFailed, 
    updateCategorySuccess, 
    updateCategoryFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_CATEGORIES_START,
    CREATE_CATEGORY_START,
    UPDATE_CATEGORY_START,
    DESTROY_CATEGORIES_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchCategoriesSaga (payload)
{
    try {
        const { status, message, data: categories } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            yield put(getCategoriesSuccess({ categories }));
        }

    } catch ({ message }) {
        yield put(getCategoriesFailed({ errorMessages: message }));
    }
}


function* createCategorySaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createCategorySuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.CATEGORY));
        }

    } catch ({ message }) {
        yield put(createCategoryFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateCategorySaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateCategorySuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.CATEGORY));
        }

    } catch ({ message }) {
        yield put(updateCategoryFailed({ errorMessages: message }));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyCategoriesSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyCategoriesSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyCategoriesFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchCategoriesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_CATEGORIES_START);

        yield call(fetchCategoriesSaga, payload);
    }
}

function* createCategoryWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_CATEGORY_START);

        yield call(createCategorySaga, payload);
    }
}

function* updateCategoryWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_CATEGORY_START);

        yield call(updateCategorySaga, payload);
    }
}

function* destroyCategoriesWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_CATEGORIES_START);

        yield call(destroyCategoriesSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchCategoriesWatcher(),
        createCategoryWatcher(),
        updateCategoryWatcher(),
        destroyCategoriesWatcher()
    ]);
 }