import { put, take, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/** Action types */
import ACTION_TYPES from './action.types';

/** Api calls */
import { fetchAllAsync, createAsync, updateAsync, destroyAsync } from '../../../services/items/item';

/** Actions */
import { 
    getItemsSuccess, 
    getItemsFailed, 
    destroyItemsSuccess, 
    destroyItemsFailed, 
    createItemSuccess, 
    createItemFailed, 
    updateItemSuccess, 
    updateItemFailed 
} from './actions';
import * as ALERT from './../alert/actions';

/** Alert messages */
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

import PATH from './../../../routes/path';

const {
    GET_ITEMS_START,
    CREATE_ITEM_START,
    UPDATE_ITEM_START,
    DESTROY_ITEMS_START
} = ACTION_TYPES;

/**
 * Sagas
 */

function* fetchItemsSaga (payload)
{
    try {
        const { status, message, data } = yield call(fetchAllAsync, payload);

        if (status !== 'success') {
        }

        if (status === 'success') {
            const items = data.map(item => ({
                ...item,
                category: item.category.name
            }));

            yield put(getItemsSuccess({ items }));
        }

    } catch ({ message }) {
        yield put(getItemsFailed({ errorMessages: message }));
    }
}


function* createItemSaga (payload)
{
    try {
        const { status, message, data } = yield call(createAsync, payload);

        if (status !== 'success') {

        }

        if (status === 'success') {
            yield put(createItemSuccess(payload));

            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.ITEM));
        }

    } catch ({ message }) {

        yield put(createItemFailed({ errorMessages: {
            name: message['item.name'],
            category_id: message['item.category_id'],
            barcode: message['item.barcode'],
            sku: message['item.sku'],
            price: message['item.price'],
            cost: message['item.cost'],
            image: message['item.image'],
            sold_by: message['item.sold_by'],
            vendor_id: message['stock.vendor_id']
        }}));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_CREATE
        }));
    }
}

function* updateItemSaga (payload)
{
    try {
        const { status, message, data } = yield call(updateAsync, payload);

        if (status !== 'success') {
        }
        
        if (status === 'success') {
            yield put(updateItemSuccess(payload));
            
            yield put(ALERT.showAlert({
                status,
                message
            }));

            yield put(push(PATH.ITEM));
        }

    } catch ({ message }) {
        yield put(updateItemFailed({ errorMessages: {
            name: message['item.name'],
            category_id: message['item.category_id'],
            barcode: message['item.barcode'],
            sku: message['item.sku'],
            price: message['item.price'],
            cost: message['item.cost'],
            image: message['item.image'],
            sold_by: message['item.sold_by'],
            vendor_id: message['stock.vendor_id']
        }}));

        yield put(ALERT.showAlert({
            status: 'error',
            message: ERROR_MESSAGE_ON_UPDATE
        }));
    }
}

function* destroyItemsSaga (payload)
{
    try {
        const { message, status } = yield call(destroyAsync, payload);

        yield put(destroyItemsSuccess(payload));

        yield put(ALERT.showAlert({
            status,
            message 
        }));

    } catch ({ message }) {
        yield put(destroyItemsFailed({ errorMessages: message }));
    }
}

/**
 * Watchers or Observers
 */

function* fetchItemsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(GET_ITEMS_START);

        yield call(fetchItemsSaga, payload);
    }
}

function* createItemWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(CREATE_ITEM_START);

        yield call(createItemSaga, payload);
    }
}

function* updateItemWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_ITEM_START);

        yield call(updateItemSaga, payload);
    }
}

function* destroyItemsWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(DESTROY_ITEMS_START);

        yield call(destroyItemsSaga, payload);
    }
}

/**
 * 
 */
 export default function* ()
 {
    yield all([
        fetchItemsWatcher(),
        createItemWatcher(),
        updateItemWatcher(),
        destroyItemsWatcher()
    ]);
 }