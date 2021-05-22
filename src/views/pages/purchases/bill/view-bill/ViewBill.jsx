import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { findAsync } from '../../../../../services/purchases/bill';

/** Actions */
import * as ALERT from '../../../../../redux/modules/alert/actions'

/** Selectors */
import { selectBill } from '../../../../../redux/modules/bill/selector';
import { selectAlert } from '../../../../../redux/modules/alert/selector';
import { selectAuth } from '../../../../../redux/modules/auth/selector';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import { Card, CardContent } from '@material-ui/core'

/** Components */
import Header from './Header';
import Actions from './Actions';
import HistoriesAndTransactions from './HistoriesAndTransactions';
import AlertPopUp from '../../../../../components/AlertPopUp';
import Items from './Items';
import NotFound from './../../../errors/NotFound';



const ViewBill = ({ authProp, alert, billProp, match }) => 
{
    const dispatch = useDispatch();
    const { id } = match.params;
    const { bill, paymentDetail: paymentDetailState, isLoading } = billProp;

    const [ billIsFound, setBillIsFound ] = useState(false);
    const [ billDetails, setBillDetails ] = useState(bill);
    const [ items, setItems ] = useState([]);
    const [ histories, setHistories ] = useState([]);
    const [ paymentDetail, setPaymentDetail ] = useState(paymentDetailState);
    const [ transactions, setTransactions ] = useState([]);

    const handleBillIsFound = () => setBillIsFound(true);
    const handleBillIsNotFound = () => setBillIsFound(false);

    const onLoadFetchBillById = async () => 
    {
        try {
            const { data, message, status } = await findAsync({ id });

            if (status !== 'success') {
    
            }
    
            if (status === 'success') 
            {
                handleBillIsFound();

                const { items: itemList, payment_detail, histories, transactions, ...details } = data;
    
                setBillDetails(details);
                setItems(itemList.map(({ details }) => details));
                setHistories(histories);
                setTransactions(transactions);
                setPaymentDetail(payment_detail);
                console.log(itemList)
            }

        } catch ({ message }) {

            handleBillIsNotFound();

            dispatch(ALERT.showAlert({
                status: 'error',
                message
            }))
        }
    }

    useEffect(() => {
        onLoadFetchBillById();
    }, [isLoading]);

    if (!isLoading && !billIsFound) {
        return <NotFound />
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
                    <Header billDetails={ billDetails } paymentDetail={ paymentDetail }/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Actions 
                                billDetails={ billDetails } 
                                isLoading={ isLoading }
                                paymentDetail={ paymentDetail }
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Items 
                        auth={ authProp }
                        billDetails={ billDetails } 
                        items={ items }
                        paymentDetail={ paymentDetail }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <HistoriesAndTransactions histories={ histories } transactions={ transactions }/>
                </Grid> 
            </Grid>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    authProp: selectAuth,
    alert: selectAlert,
    billProp: selectBill
});

export default connect(mapStateToProps, null)(ViewBill);
