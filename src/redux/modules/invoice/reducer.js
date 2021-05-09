import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

const {
    GET_INVOICES_START,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAILED,

    CREATE_INVOICE_START,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_FAILED,

    MAIL_CUSTOMER_START,
    MAIL_CUSTOMER_SUCCESS,
    MAIL_CUSTOMER_FAILED,

    MARK_AS_PAID_START,
    MARK_AS_PAID_SUCCESS,
    MARK_AS_PAID_FAILED,

    PAYMENT_START,
    PAYMENT_SUCCESS,
    PAYMENT_FAILED,

    UPDATE_INVOICE_START,
    UPDATE_INVOICE_SUCCESS,
    UPDATE_INVOICE_FAILED,

    CANCEL_INVOICE_START,
    CANCEL_INVOICE_SUCCESS,
    CANCEL_INVOICE_FAILED,

    DESTROY_INVOICES_START,
    DESTROY_INVOICES_SUCCESS,
    DESTROY_INVOICES_FAILED
} = ACTION_TYPES;

const INVOICE_DEFAULT_PROPS = {
    id: 0,
    customer_id: 0,
    currency_id: 0,
    income_category_id: 1,
    invoice_number: 'INV-00000',
    order_no: 1,
    date: DATE.today(),
    due_date: DATE.today(),
    recurring: 'No',
};

const PAYMENT_DETAIL_DEFAULT_PROPS = {
    total_discounts: 0,
    total_taxes: 0,
    sub_total: 0,
    total: 0,
    amount_due: 0,
}

const ERROR_DEFAULT= {
    customer_id: 0,
    currency_id: 0,
    income_category_id: 0,
    invoice_number: '',
    order_no: 0,
    date: '',
    due_date: '',
    recurring: '',
};

const initialState = {
    isLoading: false,
    invoice: INVOICE_DEFAULT_PROPS,
    paymentDetail: PAYMENT_DETAIL_DEFAULT_PROPS,
    invoices: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        invoices
    } = state;

    switch (type) 
    {
        case GET_INVOICES_START:
        case CREATE_INVOICE_START:
        case MAIL_CUSTOMER_START:
        case MARK_AS_PAID_START:
        case PAYMENT_START:
        case UPDATE_INVOICE_START:
        case CANCEL_INVOICE_START:
        case DESTROY_INVOICES_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_INVOICES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                invoices: payload.invoices,
                error: ERROR_DEFAULT
            };

        case GET_INVOICES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_INVOICE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_INVOICE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case MAIL_CUSTOMER_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case MAIL_CUSTOMER_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  

        case MARK_AS_PAID_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case MARK_AS_PAID_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  
          
        case PAYMENT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case PAYMENT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  

        case UPDATE_INVOICE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_INVOICE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case CANCEL_INVOICE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CANCEL_INVOICE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  

        case DESTROY_INVOICES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                invoices: invoices.filter(invoice => !payload.ids.includes(invoice.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_INVOICES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
