import ACTION_TYPES from './action.types';
import * as DATE from '../../../utils/date'

const {
    GET_BILLS_START,
    GET_BILLS_SUCCESS,
    GET_BILLS_FAILED,

    CREATE_BILL_START,
    CREATE_BILL_SUCCESS,
    CREATE_BILL_FAILED,

    MAIL_VENDOR_START,
    MAIL_VENDOR_SUCCESS,
    MAIL_VENDOR_FAILED,

    MARK_BILL_AS_PAID_START,
    MARK_BILL_AS_PAID_SUCCESS,
    MARK_BILL_AS_PAID_FAILED,

    MARK_BILL_AS_RECEIVED_START,
    MARK_BILL_AS_RECEIVED_SUCCESS,
    MARK_BILL_AS_RECEIVED_FAILED,

   BILL_PAYMENT_START,
   BILL_PAYMENT_SUCCESS,
   BILL_PAYMENT_FAILED,

    UPDATE_BILL_START,
    UPDATE_BILL_SUCCESS,
    UPDATE_BILL_FAILED,

    CANCEL_BILL_START,
    CANCEL_BILL_SUCCESS,
    CANCEL_BILL_FAILED,

    DESTROY_BILLS_START,
    DESTROY_BILLS_SUCCESS,
    DESTROY_BILLS_FAILED
} = ACTION_TYPES;

const BILL_DEFAULT_PROPS = {
    id: 0,
    vendor_id: 0,
    currency_id: 0,
    expense_category_id: 1,
    bill_number: 'BILL-00000',
    order_no: 1,
    date: DATE.today(),
    due_date: DATE.today(),
    recurring: 'No',
};

const BILL_DETAIL_DEFAULT_PROPS = {
    discount_id: 0,
    bill_id: 0,
    total_discounts: 0,
    total_taxes: 0,
    sub_total: 0,
    total: 0,
    amount_due: 0,
}

const ERROR_DEFAULT= {
    discount_id: '',
    tax_id: '',
    vendor_id: '',
    currency_id: '',
    expense_category_id: '',
    bill_number: '',
    order_no: '',
    date: '',
    due_date: '',
    recurring: '',
};

const initialState = {
    isLoading: false,
    bill: BILL_DEFAULT_PROPS,
    paymentDetail:BILL_DETAIL_DEFAULT_PROPS,
    bills: [],
    error: ERROR_DEFAULT
};

export default (state = initialState, { type, payload }) => 
{
    const {
        bills
    } = state;

    switch (type) 
    {
        case GET_BILLS_START:
        case CREATE_BILL_START:
        case MAIL_VENDOR_START:
        case MARK_BILL_AS_PAID_START:
        case MARK_BILL_AS_RECEIVED_START:
        case BILL_PAYMENT_START:
        case UPDATE_BILL_START:
        case CANCEL_BILL_START:
        case DESTROY_BILLS_START:
            return { 
                ...state, 
                isLoading: true 
            };

        case GET_BILLS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                bills: payload.bills,
                error: ERROR_DEFAULT
            };

        case GET_BILLS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case CREATE_BILL_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CREATE_BILL_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
        
        case MAIL_VENDOR_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case MAIL_VENDOR_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  

        case MARK_BILL_AS_PAID_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case MARK_BILL_AS_PAID_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  
          
        case MARK_BILL_AS_RECEIVED_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case MARK_BILL_AS_RECEIVED_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };   
            
        case BILL_PAYMENT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case BILL_PAYMENT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  

        case UPDATE_BILL_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case UPDATE_BILL_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };            

        case CANCEL_BILL_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT
            };

        case CANCEL_BILL_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };  

        case DESTROY_BILLS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                bills: bills.filter(bill => !payload.ids.includes(bill.id)) || [],
                error: ERROR_DEFAULT
            };

        case DESTROY_BILLS_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };      
                   
        default:
            return state;
    }
}
