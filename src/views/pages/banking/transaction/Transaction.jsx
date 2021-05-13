import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

/** API */
import { fetchAllAsync } from '../../../../services/banking/transaction';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import MaterialTable from '../../../../components/MaterialTable'

import PATH from '../../../../routes/path';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';



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
        
    }

    if (model_type.includes('Payment')) {
        
    }

    if (model_type.includes('Payroll')) {
        
    }

    return path.replace(':id', model_id);
}

const Transaction = () => 
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
            <MaterialTable
                columns={ columns }      
                data={ transactions }
                title={ 'Transactions' }
            />   
        </>
    );
}

export default Transaction