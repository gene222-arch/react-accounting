import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns'

/** Selectors */
import { selectBill } from '../../../../../redux/modules/bill/selector';
import { selectVendor } from '../../../../../redux/modules/vendor/selector';
import { selectCurrency } from '../../../../../redux/modules/currency/selector';
import { selectAlert } from '../../../../../redux/modules/alert/selector';
import { selectDiscount } from '../../../../../redux/modules/discount/selector';
import { selectTax } from '../../../../../redux/modules/tax/selector';


/** Actions */
import * as BILL from '../../../../../redux/modules/bill/actions';
import * as VENDOR from '../../../../../redux/modules/vendor/actions';
import * as CURRENCY from '../../../../../redux/modules/currency/actions';
import * as DISCOUNT from '../../../../../redux/modules/discount/actions'
import * as TAX from '../../../../../redux/modules/tax/actions'
import * as ALERT from '../../../../../redux/modules/alert/actions'

/** API */
import { findAsync } from '../../../../../services/purchases/bill';

/** Material UI Components */
import { Card, CardContent, CardActions } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from '../../../../../components/SaveCancelButtons';
import AlertPopUp from '../../../../../components/AlertPopUp';
import SelectCustomer from './SelectVendor';
import BillDetail from './BillDetail';
import SelectItems from './SelectItems';
import PaymentDetail from './PaymentDetail';
import RecurringAndMore from './RecurringAndMore';

import * as DATE from '../../../../../utils/date'
import PATH from '../../../../../routes/path';


const UpdateBill = ({ alert, currencyProp, discountProp, taxProp, vendorProp, billProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, bill, paymentDetail, error } = billProp;

    const [ isFetching, setIsFetching ] = useState(false);
    const [ billState, setBillState ] = useState(bill);
    const [ paymentDetailState, setPaymentDetailState ] = useState(paymentDetail);
    const [ currency, setCurrency ] = useState({ id: 0, rate: 0 });
    const [ items, setItems ] = useState([]);
    const [ discount, setDiscount ] = useState({ id: 0, rate: 0 });
    const [ tax, setTax ] = useState({ id: 0, rate: 0 });

    const handleChange = (e) => setBillState({ ...billState, [e.target.name]: e.target.value });

    const handleChangeBillDate = (date) => setBillState({ ...billState, date: format(date, 'yyyy-MM-dd') });

    const handleChangeDueDate = (date) => setBillState({ ...billState, due_date: format(date, 'yyyy-MM-dd') });

    const handleClickReselectVendor = () => setBillState({ ...billState, vendor_id: 0 });

    const onLoadFetchBill = async () => 
    {
        setIsFetching(true);

        const { data, message, status } = await findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') 
        {
            const { items: itemList, payment_detail, histories, transactions, ...details } = data;

            const { vendor, currency, income_category, ...billData } = details;

            setCurrency({ id: details.currency_id });
            setDiscount({ ...discount, id: payment_detail.discount_id });
            setTax({ ...tax, id: payment_detail.tax_id });
            setBillState(billData);
            setItems(itemList.map(({ details }) => details));
            setPaymentDetailState(payment_detail);

            setIsFetching(false);   
        }
    }

    const onLoadFetchVendors = () => dispatch(VENDOR.getVendors());

    const onLoadFetchCurrencies = () => dispatch(CURRENCY.getCurrencies());

    const onLoadFetchDiscounts = () => dispatch(DISCOUNT.getDiscounts());

    const onLoadFetchTaxes = () => dispatch(TAX.getTaxes());

    const onSubmitUpdateBill = (e) => {
        dispatch(BILL.updateBill({
            ...billState,
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
        onLoadFetchVendors();
        onLoadFetchCurrencies();
        onLoadFetchDiscounts();
        onLoadFetchTaxes();
        onLoadFetchBill();
    }, []);

    return !isFetching && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateBill }>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <SelectCustomer
                                            billState={ billState } 
                                            vendorProp={ vendorProp }
                                            handleChange={ handleChange } 
                                            handleClickReselectVendor={ handleClickReselectVendor }
                                            error={ error } 
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <BillDetail
                                            billState={ billState }
                                            billDate={ billState.date }
                                            handleChangeBillDate={ handleChangeBillDate }
                                            dueDate={ billState.due_date }
                                            handleChangeDueDate={ handleChangeDueDate }
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
                            discounts={ discountProp.discounts }
                            taxes={ taxProp.taxes }
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
                            taxes={ taxProp.taxes }
                            discounts={ discountProp.discounts }
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
                        <Card>
                            <CardContent>
                                <RecurringAndMore billState={ billState } handleChange={ handleChange } />
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <SaveCancelButtons 
                                    isLoading={ isLoading }
                                    cancelBtnCallback={ () => history.push(PATH.BILL) }
                                    saveBtnCallback={ onSubmitUpdateBill }
                                />
                            </CardActions>
                        </Card>
                    </Grid>     
                </Grid>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    currencyProp: selectCurrency,
    vendorProp: selectVendor,
    billProp: selectBill,
    discountProp: selectDiscount,
    taxProp: selectTax
});

export default connect(mapStateToProps, null)(UpdateBill)
