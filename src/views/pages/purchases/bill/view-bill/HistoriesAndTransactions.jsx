import React from 'react'
import MaterialTable from '../../../../../components/MaterialTable';
import Grid from '@material-ui/core/Grid'

const HistoriesAndTransactions = ({ histories, transactions }) => 
{
    const historyColumns = [
        { field: 'id', hidden: true },
        { title: 'Date', field: 'created_at' },
        { title: 'Status', field: 'status' },
        { title: 'Description', field: 'description' }
    ];

    const transactionColumns = [
        { field: 'id', hidden: true },
        { title: 'Date', field: 'created_at' },
        { title: 'Amount', field: 'amount' },
        { title: 'Actions', field: 'category' }
    ];

    const options = {
        selection: false,
        search: false
    };

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <MaterialTable 
                        columns={ historyColumns }      
                        data={ histories }  
                        options={ options }
                        title='Histories'
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <MaterialTable 
                        columns={ transactionColumns }      
                        data={ transactions }  
                        options={ options }
                        title='Transactions'
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default HistoriesAndTransactions
