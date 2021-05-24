import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns'

/** Selectors */
import { selectDefaultSettings } from './../../../../redux/modules/default-settings/selector';
import { selectEstimateInvoice } from './../../../../redux/modules/estimate-invoice/selector';
import { selectCustomer } from './../../../../redux/modules/customer/selector';
import { selectCurrency } from './../../../../redux/modules/currency/selector';
import { selectAlert } from './../../../../redux/modules/alert/selector';
import { selectDiscount } from './../../../../redux/modules/discount/selector';
import { selectTax } from './../../../../redux/modules/tax/selector';

/** API */
import { findAsync } from '../../../../services/sales/estimate.invoice';

/** Actions */
import * as ESTIMATE_INVOICE from './../../../../redux/modules/estimate-invoice/actions';
import * as CUSTOMER from './../../../../redux/modules/customer/actions';
import * as CURRENCY from './../../../../redux/modules/currency/actions';
import * as ALERT from './../../../../redux/modules/alert/actions'
import * as DISCOUNT from './../../../../redux/modules/discount/actions'
import * as TAX from './../../../../redux/modules/tax/actions'

/** Material UI Components */
import { Card, CardContent, CardActions } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { FormControlLabel, Switch } from '@material-ui/core'

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from './../../../../components/SaveCancelButtons';
import AlertPopUp from './../../../../components/AlertPopUp';
import SelectCustomer from './SelectCustomer';
import EstimateInvoiceDetail from './EstimateInvoiceDetail';
import SelectItems from './SelectItems';
import PaymentDetail from './PaymentDetail';

import * as DATE from './../../../../utils/date'
import PATH from './../../../../routes/path';


const UpdateEstimateInvoice = ({ alert, discountProp, taxProp, currencyProp, defaultSettingsProp, customerProp, estimateInvoiceProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, estimateInvoice, paymentDetail, error } = estimateInvoiceProp;
    const {  defaultSettings } = defaultSettingsProp;

    /** Default props */
    const CURRENCY_DEFAULT_PROPS = { id: defaultSettings.currency_id, rate: 0 };
    const INVOICE_DEFAULT_PROPS = { ...estimateInvoice, income_category_id: defaultSettings.income_category_id };
    const DISCOUNT_TAX_DEFAULT_PROPS = { id: 0, rate: 0 };

    /** States */
    const [ estimateInvoiceState, setEstimateInvoiceState ] = useState(INVOICE_DEFAULT_PROPS);
    const [ paymentDetailState, setPaymentDetailState ] = useState(paymentDetail);
    const [ currency, setCurrency ] = useState(CURRENCY_DEFAULT_PROPS);
    const [ discount, setDiscount ] = useState(DISCOUNT_TAX_DEFAULT_PROPS);
    const [ items, setItems ] = useState([]);
    const [ tax, setTax ] = useState(DISCOUNT_TAX_DEFAULT_PROPS);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name !== 'enable_reminder'
            ? setEstimateInvoiceState({ ...estimateInvoiceState, [name]: value })
            : setEstimateInvoiceState({ ...estimateInvoiceState, enable_reminder: checked });
    }

    const handleChangeEstimateDate = (date) => setEstimateInvoiceState({ ...estimateInvoiceState, estimated_at: format(date, 'yyyy-MM-dd') });

    const handleChangeExpiryDate = (date) => setEstimateInvoiceState({ ...estimateInvoiceState, expired_at: format(date, 'yyyy-MM-dd') });

    const handleClickReselectCustomer = () => setEstimateInvoiceState({ ...estimateInvoiceState, customer_id: 0 });

    const updatePaymentDetails = () => 
    {
        if (discountProp.discounts.length && taxProp.taxes.length) 
        {
            const subTotal = items.reduce((total, item) => total + parseFloat(item.amount), 0);

            const total_discounts = (discountProp.discounts.find(({ id }) => id === discount.id)?.rate / 100) * subTotal;
            const total_taxes = (taxProp.taxes.find(({ id }) => id === tax.id)?.rate / 100) * subTotal; 
            const total = (subTotal + total_taxes) - total_discounts;

            setPaymentDetailState({
                ...paymentDetailState,
                sub_total: subTotal.toFixed(2),
                total: total.toFixed(2),
                total_discounts: total_discounts.toFixed(2),
                total_taxes: total_taxes.toFixed(2)
            });
        }
    }

    const onLoadFetchDiscounts = () => dispatch(DISCOUNT.getDiscounts());

    const onLoadFetchTaxes = () => dispatch(TAX.getTaxes());

    const onLoadFetchCustomers = () => dispatch(CUSTOMER.getCustomers());

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    const onLoadFetchEstimateInvoice = async () => 
    {
        try {
            const { data, message, status } = await findAsync({ id });

            if (status !== 'success') {
    
            }
    
            if (status === 'success') 
            {
                const { items: itemList, payment_detail, histories, customer, ...details } = data;

                setCurrency({ id: details.currency_id });
                setDiscount({ ...discount, id: payment_detail.discount_id || 0 });
                setTax({ ...tax, id: payment_detail.tax_id || 0 });
                setEstimateInvoiceState(details);
                setItems(itemList.map(({ pivot }) => pivot));
                setPaymentDetailState(payment_detail);
            }
        } catch ({ message }) {

        }
    }

    const onSubmitUpdateInvoice = () => {
        dispatch(ESTIMATE_INVOICE.updateEstimateInvoice({
            ...estimateInvoiceState,
            currency_id: currency.id,
            items: items.map(({ tableData, ...item }) => item),
            payment_details: {
                ...paymentDetailState,
                discount_id: discount.id,
                tax_id: tax.id
            }
        }))
    };

    useEffect(() => {
        onLoadFetchEstimateInvoice();
        onLoadFetchCustomers();
        onLoadFetchCurrencies();
        onLoadFetchDiscounts();
        onLoadFetchTaxes();
    }, []);

    useEffect(() => {
        updatePaymentDetails();
    }, [items, discount, tax]);

    return (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateInvoice }>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <SelectCustomer 
                                            estimateInvoiceState={ estimateInvoiceState } 
                                            customerProp={ customerProp }
                                            handleChange={ handleChange } 
                                            handleClickReselectCustomer={ handleClickReselectCustomer }
                                            error={ error } 
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <EstimateInvoiceDetail
                                            estimateInvoiceState={ estimateInvoiceState }
                                            estimatedAt={ estimateInvoiceState.estimated_at }
                                            handleChangeEstimateDate={ handleChangeEstimateDate }
                                            expiredAt={ estimateInvoiceState.expired_at }
                                            handleChangeExpiryDate={ handleChangeExpiryDate }
                                            handleChange={ handleChange }
                                            error={ error }
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>                   
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <SelectItems 
                            discount={ discount }
                            tax={ tax }
                            items={ items } 
                            setItems={ setItems } 
                            paymentDetailState={ paymentDetailState }
                            setPaymentDetailState={ setPaymentDetailState }
                        />
                    </Grid>   
                    <Grid item item xs={12} sm={12} md={6} lg={6} style={{ marginLeft: 'auto' }}>
                        <PaymentDetail 
                            currencies={ currencyProp.currencies }
                            discounts={ discountProp.discounts }
                            taxes={ taxProp.taxes }
                            currency={ currency }
                            setCurrency={ setCurrency }
                            discount={ discount }
                            setDiscount={ setDiscount }
                            paymentDetailState={ paymentDetailState }
                            setPaymentDetailState={ setPaymentDetailState }
                            tax={ tax }
                            setTax={ setTax }
                            items={ items }
                            setItems={ setItems }
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControlLabel
                            control={
                                <Switch 
                                    checked={ Boolean(estimateInvoiceState.enable_reminder) } 
                                    onChange={ handleChange } 
                                    name='enable_reminder' 
                                />}
                            label='Enable reminder'
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <SaveCancelButtons 
                            isLoading={ isLoading }
                            cancelBtnCallback={ () => history.push(PATH.ESTIMATE_INVOICE) }
                            saveBtnCallback={ onSubmitUpdateInvoice }
                        />
                    </Grid>     
                </Grid>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    defaultSettingsProp: selectDefaultSettings,
    currencyProp: selectCurrency,
    customerProp: selectCustomer,
    estimateInvoiceProp: selectEstimateInvoice,
    discountProp: selectDiscount,
    taxProp: selectTax,
    currencyProp: selectCurrency
});

export default connect(mapStateToProps, null)(UpdateEstimateInvoice)
