import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

const {
    GET_ESTIMATE_INVOICES_START,
    GET_ESTIMATE_INVOICES_SUCCESS,
    GET_ESTIMATE_INVOICES_FAILED,

    CREATE_ESTIMATE_INVOICE_START,
    CREATE_ESTIMATE_INVOICE_SUCCESS,
    CREATE_ESTIMATE_INVOICE_FAILED,

    CONVERT_TO_INVOICE_START,
    CONVERT_TO_INVOICE_SUCCESS,
    CONVERT_TO_INVOICE_FAILED,

    MAIL_ESTIMATE_INVOICE_CUSTOMER_START,
    MAIL_ESTIMATE_INVOICE_CUSTOMER_SUCCESS,
    MAIL_ESTIMATE_INVOICE_CUSTOMER_FAILED,

    MARK_ESTIMATE_INVOICE_AS_APPROVED_START,
    MARK_ESTIMATE_INVOICE_AS_APPROVED_SUCCESS,
    MARK_ESTIMATE_INVOICE_AS_APPROVED_FAILED,

    MARK_ESTIMATE_INVOICE_AS_REFUSED_START,
    MARK_ESTIMATE_INVOICE_AS_REFUSED_SUCCESS,
    MARK_ESTIMATE_INVOICE_AS_REFUSED_FAILED,

    UPDATE_ESTIMATE_INVOICE_START,
    UPDATE_ESTIMATE_INVOICE_SUCCESS,
    UPDATE_ESTIMATE_INVOICE_FAILED,

    DESTROY_ESTIMATE_INVOICES_START,
    DESTROY_ESTIMATE_INVOICES_SUCCESS,
    DESTROY_ESTIMATE_INVOICES_FAILED
} = ACTION_TYPES;

const ESTIMATE_INVOICE_DEFAULT_PROPS = {
    id: 0,
    customer_id: 0,
    currency_id: 0,
    estimate_number: 'EST-00000',
    enable_reminder: false,
    estimated_at: DATE.today(),
    expired_at: DATE.today(),
    status: 'Draft'
};

const PAYMENT_DETAIL_DEFAULT_PROPS = {
    tax_id: 0,
    discount_id: 0,
    total_discounts: 0,
    total_taxes: 0,
    sub_total: 0,
    total: 0,
    amount_due: 0,
};

const ERROR_DEFAULT= {
    discount_id: '',
    tax_id: '',
    customer_id: '',
    currency_id: '',
    estimate_number: '',
    estimated_at: '',
    expired_at: ''
};

const initialState = {
    isLoading: false,
    estimateInvoice: ESTIMATE_INVOICE_DEFAULT_PROPS,
    paymentDetail: PAYMENT_DETAIL_DEFAULT_PROPS,
    estimateInvoices: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        estimateInvoices
    } = state;

    switch (type) 
    {
        case GET_ESTIMATE_INVOICES_START:
        case CREATE_ESTIMATE_INVOICE_START:
        case CONVERT_TO_INVOICE_START:
        case MAIL_ESTIMATE_INVOICE_CUSTOMER_START:
        case MARK_ESTIMATE_INVOICE_AS_APPROVED_START:
        case MARK_ESTIMATE_INVOICE_AS_REFUSED_START:
        case UPDATE_ESTIMATE_INVOICE_START:
        case DESTROY_ESTIMATE_INVOICES_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_ESTIMATE_INVOICES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                estimateInvoices: payload.estimateInvoices,
                error: ERROR_DEFAULT
            };

        case GET_ESTIMATE_INVOICES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_ESTIMATE_INVOICE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_ESTIMATE_INVOICE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };

        case CONVERT_TO_INVOICE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CONVERT_TO_INVOICE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case MAIL_ESTIMATE_INVOICE_CUSTOMER_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case MAIL_ESTIMATE_INVOICE_CUSTOMER_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  

        case MARK_ESTIMATE_INVOICE_AS_APPROVED_SUCCESS:
        case MARK_ESTIMATE_INVOICE_AS_REFUSED_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case MARK_ESTIMATE_INVOICE_AS_APPROVED_FAILED: 
        case MARK_ESTIMATE_INVOICE_AS_REFUSED_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  

        case UPDATE_ESTIMATE_INVOICE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_ESTIMATE_INVOICE_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case DESTROY_ESTIMATE_INVOICES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                estimateInvoices: estimateInvoices.filter(({ id }) => !payload.ids.includes(id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_ESTIMATE_INVOICES_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
