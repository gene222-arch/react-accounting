import React, { lazy } from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import PATH from './../../../routes/path';

const ReportItem = lazy(() => import('./ReportItem'))

const Reports = () =>
{
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h5" color="initial">Reports</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <ReportItem 
                        title='Expense Summary' 
                        description='Monthly expense summary by category.'
                        path={ PATH.REPORT_EXPENSE_SUMMARY }
                        amount={ 0 }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <ReportItem 
                        title='Income Summary' 
                        description='Monthly income summary by category.'
                        path={ PATH.REPORT_INCOME_SUMMARY }
                        amount={ 0 }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <ReportItem 
                        title='Income vs Expense' 
                        description='Monthly income vs expense by category.'
                        path={ PATH.REPORT_INCOME_VS_EXPENSE_SUMMARY }
                        amount={ 0 }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h5" color="initial">Accounting</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <ReportItem 
                        title='Balance Sheet' 
                        description='Snapshot of your Assets, Liabilities, and more...'
                        path={ PATH.ACCOUNTING_REPORT_BALANCE_SHEET }
                        amount={ 0 }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <ReportItem 
                        title='General Ledger' 
                        description='Detailed list of all transactions'
                        path={ PATH.ACCOUNTING_REPORT_GENERAL_LEDGER }
                        amount={ 0 }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <ReportItem 
                        title='Profit and Loss' 
                        description='Monthly profit and loss by category.'
                        amount={ 0 }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <ReportItem 
                        title='Tax Summary' 
                        description='Monthly tax summary.'
                        path={ PATH.ACCOUNTING_REPORT_TAX_SUMMARY }
                        amount={ 0 }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <ReportItem 
                        title='Trial Balance' 
                        description='Balance all of your chart accounts.'
                        path={ PATH.ACCOUNTING_REPORT_TRIAL_BALANCE }
                        amount={ 0 }
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Reports
