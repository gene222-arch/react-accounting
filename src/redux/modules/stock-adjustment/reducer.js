import ACTION_TYPES from './action.types';

const {
    GET_STOCK_ADJUSTMENTS_START,
    GET_STOCK_ADJUSTMENTS_SUCCESS,
    GET_STOCK_ADJUSTMENTS_FAILED,

    CREATE_STOCK_ADJUSTMENT_START,
    CREATE_STOCK_ADJUSTMENT_SUCCESS,
    CREATE_STOCK_ADJUSTMENT_FAILED,

    UPDATE_STOCK_ADJUSTMENT_START,
    UPDATE_STOCK_ADJUSTMENT_SUCCESS,
    UPDATE_STOCK_ADJUSTMENT_FAILED,

    DESTROY_STOCK_ADJUSTMENTS_START,
    DESTROY_STOCK_ADJUSTMENTS_SUCCESS,
    DESTROY_STOCK_ADJUSTMENTS_FAILED
} = ACTION_TYPES;

const STOCK_ADJUSTMENT_DEFAULT_PROPS = {
    id: 0,
    stock_adjustment_number: 'SA-0001',
    reason: 'Received items'
};

const ERROR_DEFAULT= {
    stock_adjustment_number: '',
    reason: ''
};

const initialState = {
    isLoading: false,
    stockAdjustment: STOCK_ADJUSTMENT_DEFAULT_PROPS,
    stockAdjustments: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        stockAdjustments
    } = state;

    switch (type) 
    {
        case GET_STOCK_ADJUSTMENTS_START:
        case CREATE_STOCK_ADJUSTMENT_START:
        case UPDATE_STOCK_ADJUSTMENT_START:
        case DESTROY_STOCK_ADJUSTMENTS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_STOCK_ADJUSTMENTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                stockAdjustments: payload.stockAdjustments,
                error: ERROR_DEFAULT
            };

        case GET_STOCK_ADJUSTMENTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_STOCK_ADJUSTMENT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_STOCK_ADJUSTMENT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case UPDATE_STOCK_ADJUSTMENT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_STOCK_ADJUSTMENT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_STOCK_ADJUSTMENTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                stockAdjustments: stockAdjustments.filter(stockAdjustment => !payload.ids.includes(stockAdjustment.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_STOCK_ADJUSTMENTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
