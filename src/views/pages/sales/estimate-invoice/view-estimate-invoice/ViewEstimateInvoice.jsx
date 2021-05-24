import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { findAsync } from '../../../../../services/sales/estimate.invoice';

/** Actions */
import * as ALERT from '../../../../../redux/modules/alert/actions'

/** Selectors */
import { selectEstimateInvoice } from '../../../../../redux/modules/estimate-invoice/selector';
import { selectAlert } from '../../../../../redux/modules/alert/selector';
import { selectAuth } from '../../../../../redux/modules/auth/selector';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import { Card, CardContent } from '@material-ui/core'

/** Components */
import Header from './Header';
import Actions from './Actions';
import Histories from './Histories';
import AlertPopUp from '../../../../../components/AlertPopUp';
import Items from './Items';



const ViewEstimateInvoice = ({ authProp, alert, estimateInvoiceProp, match }) => 
{
    const dispatch = useDispatch();
    const { id } = match.params;

    const { estimateInvoice, paymentDetail: paymentDetailState, isLoading, error } = estimateInvoiceProp;

    const [ fetchingStatus, setFetchingStatus ] = useState('Fetching');
    const [ estimateInvoiceDetails, setEstimateInvoiceDetails ] = useState(estimateInvoice);
    const [ items, setItems ] = useState([]);
    const [ histories, setHistories ] = useState([]);
    const [ paymentDetail, setPaymentDetail ] = useState(paymentDetailState);

    const disableBtnOnMarkedEstimate = () =>
    {
        const status = estimateInvoiceDetails.status.toLowerCase();

        switch (status) {
            case 'approved':
            case 'refused':
            case 'cancelled':
            case 'invoiced':
                return true;
            default:
                return false;
        }
    }

    const onLoadFetchInvoiceById = async () => 
    {
        try {
            const { data, message, status } = await findAsync({ id });

            if (status !== 'success') {
                setFetchingStatus('no content');
            }
    
            if (status === 'success') 
            {
                setFetchingStatus('success');

                const { items: itemList, payment_detail, histories, transactions, ...details } = data;
    
                setEstimateInvoiceDetails(details);
                setItems(itemList.map(({ pivot }) => pivot));
                setHistories(histories);
                setPaymentDetail(payment_detail);
            }
        } catch ({ message }) {
            setFetchingStatus('error');
        }
    }

    useEffect(() => {
        onLoadFetchInvoiceById();

        return () => {
            setEstimateInvoiceDetails(estimateInvoice);
            setItems([]);
            setHistories([]);
            setPaymentDetail(paymentDetailState);
        }
    }, [isLoading]);

    if (fetchingStatus === 'Fetching') {
        return 'Fetching data from server...';
    }

    return (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Header 
                        estimateInvoiceDetails={ estimateInvoiceDetails } 
                        paymentDetail={ paymentDetail }
                        disableBtnOnMarkedEstimate={ disableBtnOnMarkedEstimate }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Actions 
                                estimateInvoiceDetails={ estimateInvoiceDetails } 
                                paymentDetail={ paymentDetail }
                                disableBtnOnMarkedEstimate={ disableBtnOnMarkedEstimate }
                                error={ error }
                                isLoading={ isLoading }
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Items 
                        auth={ authProp }
                        estimateInvoiceDetails={ estimateInvoiceDetails } 
                        items={ items }
                        paymentDetail={ paymentDetail }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Histories histories={ histories } />
                </Grid> 
            </Grid>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    authProp: selectAuth,
    alert: selectAlert,
    estimateInvoiceProp: selectEstimateInvoice
});

export default connect(mapStateToProps, null)(ViewEstimateInvoice);
