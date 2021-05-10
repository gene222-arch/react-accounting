import ACTION_TYPES from './action.types';

const {
    GET_WAREHOUSES_START,
    GET_WAREHOUSES_SUCCESS,
    GET_WAREHOUSES_FAILED,

    CREATE_WAREHOUSE_START,
    CREATE_WAREHOUSE_SUCCESS,
    CREATE_WAREHOUSE_FAILED,

    UPDATE_WAREHOUSE_START,
    UPDATE_WAREHOUSE_SUCCESS,
    UPDATE_WAREHOUSE_FAILED,

    DESTROY_WAREHOUSES_START,
    DESTROY_WAREHOUSES_SUCCESS,
    DESTROY_WAREHOUSES_FAILED
} = ACTION_TYPES;

const WAREHOUSE_DEFAULT_PROPS = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    default_warehouse: false,
    enabled: false
};

const ERROR_DEFAULT= {
    name: '',
    email: '',
    phone: '',
    address: '',
    default_warehouse: false,
    enabled: false
};

const initialState = {
    isLoading: false,
    warehouse: WAREHOUSE_DEFAULT_PROPS,
    warehouses: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        warehouses
    } = state;

    switch (type) 
    {
        case GET_WAREHOUSES_START:
        case CREATE_WAREHOUSE_START:
        case UPDATE_WAREHOUSE_START:
        case DESTROY_WAREHOUSES_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_WAREHOUSES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                warehouses: payload.warehouses,
                error: ERROR_DEFAULT
            };

        case GET_WAREHOUSES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_WAREHOUSE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_WAREHOUSE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_WAREHOUSE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_WAREHOUSE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_WAREHOUSES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                warehouses: warehouses.filter(warehouse => !payload.ids.includes(warehouse.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_WAREHOUSES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
