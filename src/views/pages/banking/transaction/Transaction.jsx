import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

/** Selectors */
import { selectUser } from '../../../../redux/modules/auth/selector';

/** API */
import { fetchAllAsync } from '../../../../services/banking/transaction';

/** File saver */
import { generateTransactionExcelAsync } from './../../../../services/exports/excel/transaction';
import { generateTransactionCSVAsync } from './../../../../services/exports/csv/transaction';

/** Material Ui Styles */
import { makeStyles, Grid } from '@material-ui/core';

/** Components */
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';
import MaterialTable from '../../../../components/MaterialTable'
import ImportExportActions from '../../../../components/ImportExportActions';

import PATH from '../../../../routes/path';
import { createStructuredSelector } from 'reselect';

const itemUseStyles = makeStyles(theme => ({
}));

const findPathByModel = (model_id = 0, model_type = '') => 
{
    let path = '';

    if (model_type.includes('Invoice')) {
        path = PATH.VIEW_INVOICE;
    }

    if (model_type.includes('Revenue')) {
        path = PATH.UPDATE_REVENUE;
    }

    if (model_type.includes('Bill')) {
        path = PATH.VIEW_BILL
    }

    if (model_type.includes('Payment')) {
        path = PATH.UPDATE_PAYMENT
    }   

    if (model_type.includes('Payroll')) {
        path = PATH.UPDATE_RUN_PAYROLL
    }

    return path.replace(':id', model_id);
}

const Transaction = ({ userProp }) => 
{
    const history = useHistory();
    const classes = itemUseStyles();
    const dispatch = useDispatch();
    
    const [ transactions, setTransactions ] = useState([]);

    const columns = [
        { title: 'model_id', field: 'model_id', hidden: true },
        { title: 'model_type', field: 'model_type', hidden: true },
        { 
            title: 'Date', 
            field: 'created_at', 
            render: ({ model_id, model_type, created_at }) => <StyledNavLink to={ findPathByModel(model_id, model_type) } text={ created_at }/>
        },
        { 
            title: 'Amount', 
            field: 'amount', 
        },
        { 
            title: 'Type', 
            field: 'type', 
        },
        { 
            title: 'Category', 
            field: 'category', 
        },
        { 
            title: 'Account', 
            field: 'account', 
        },
        { 
            title: 'Description', 
            field: 'description', 
        },
    ];

    const handleClickExportTransactionExcel = () => generateTransactionExcelAsync(userProp.email);
    
    const handleClickExportTransactionCSV = () => generateTransactionCSVAsync(userProp.email);

    const onLoadFetchTransactions = async () => 
    {
        const { data, message, status } = await fetchAllAsync();

        if (status !== 'success') {

        }

        if (status === 'success') {
            const transactionList = data.map(({ model_id, model_type, created_at, amount, type, category, account, description }) => ({
                model_id,
                model_type,
                created_at,
                amount,
                type,
                category,
                account: account.name,
                description
            }))

            setTransactions(transactionList);
        }
    } 

    useEffect(() => {
        onLoadFetchTransactions();
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ImportExportActions 
                        title='Transactions'
                        handleClickExportExcel={ handleClickExportTransactionExcel }
                        handleClickExportCSV={ handleClickExportTransactionCSV }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MaterialTable
                        columns={ columns }      
                        data={ transactions }
                        title={ 'Transactions' }
                    />
                </Grid>
            </Grid>   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    userProp: selectUser
});

export default connect(mapStateToProps, null)(Transaction)