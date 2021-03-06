import ACTION_TYPES from './action.types';

const {
    GET_ITEMS_START,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,

    CREATE_ITEM_START,
    CREATE_ITEM_SUCCESS,
    CREATE_ITEM_FAILED,

    UPDATE_ITEM_START,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILED,

    DESTROY_ITEMS_START,
    DESTROY_ITEMS_SUCCESS,
    DESTROY_ITEMS_FAILED
} = ACTION_TYPES;


const ITEM_DEFAULT_PROPS = {
    id: 0,
    item: {
        category_id: 0,
        sku: '',
        barcode: '',
        name: '',
        description: '',
        price: 0,
        cost: 0,
        sold_by: 'each',
        is_for_sale: false,
        image: '',
    },
    stock: {
        vendor_id: 0,
        in_stock: 0,
        minimum_stock: 1,
    },
    track_stock: false
};

const ERROR_DEFAULT = { 
    category_id: '',
    sku: '',
    barcode: '',
    name: '',
    price: '',
    cost: '',
    sold_by: '',
    image: '',
    vendor_id: '',
};

const initialState = {
    item: ITEM_DEFAULT_PROPS,
    items: [],
    isLoading: false,
    error: ERROR_DEFAULT
}

export default (state = initialState, { type, payload }) => 
{
    const {
        items
    } = state;

    switch (type) 
    {
        case GET_ITEMS_START:
        case CREATE_ITEM_START:
        case UPDATE_ITEM_START:
        case DESTROY_ITEMS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_ITEMS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                items: payload.items,
                error: ERROR_DEFAULT
            };

        case GET_ITEMS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_ITEM_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_ITEM_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_ITEM_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_ITEM_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_ITEMS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                items: items.filter(item => !payload.ids.includes(item.id)),
                error: ERROR_DEFAULT
            };

        case DESTROY_ITEMS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };             
        default:
            return state;
    }
}
