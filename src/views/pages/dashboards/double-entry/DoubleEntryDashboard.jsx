import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

/** API */
import fetchDashboardAsync from './../../../../services/dashboards/double.entry.dashboard';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'

/** Components */
import Cards from './Cards';
import Container from '@material-ui/core/Container'
import CashFlowChart from './CashFlowChart';
import Header from './Header';
import IncomeByCOA from './IncomeByCOA';
import ExpenseByCOA from './ExpenseByCOA';
import AccountBalance from './AccountBalance';
import LatestIncomeByCOA from './LatestIncomeByCOA';
import LatestExpenseByCOA from './LatestExpenseByCOA';

/** Utils */
import * as DATE from '../../../../utils/date'


const DASHBOARD_DATA_DEFAULT_PROPS = {
    totalExpense: 0,
    totalIncome: 0,
    totalProfit: 0,
    accountBalances: [],
    latestExpenseByChartOfAccounts: [],
    latestIncomeByChartOfAccounts: [],
    incomeByChartOfAccounts: [],
    expenseByChartOfAccounts: [],
    receivables: 0,
    payables: 0,
    upcoming: 0,
    cashFlow: {
        monthlyExpenseByChartOfAccounts: [],
        monthlyIncomeByChartOfAccounts: [],
        monthlyProfitByChartOfAccounts: [],
    },
};

const DoubleEntryDashboard = () => 
{
    const [ dashboardData, setDashboardData ] = useState(DASHBOARD_DATA_DEFAULT_PROPS);
    const [ dateFrom, setDateFrom ] = useState(DATE.today());
    const [ dateTo, setDateTo ] = useState(DATE.today());

    const handleChangeDateFrom = date => setDateFrom(format(date, 'yyyy-MM-dd'));

    const handleChangeDateTo = date => setDateTo(format(date, 'yyyy-MM-dd'));

    const onLoadFetchDoubleEntryDashboard =  async () => 
    {
        try {
            const { data, message, status } = await fetchDashboardAsync();
            
            if (status !== 'success') {

            }

            if (status === 'success') {
                setDashboardData(data);
            }
        } catch ({ message }) {
            
        }
    }

    const handleClickUpdateDashboard =  async () => 
    {
        try {
            const { data, message, status } = await fetchDashboardAsync({ dateFrom, dateTo });
            
            if (status !== 'success') {

            }

            if (status === 'success') {
                setDashboardData(data);
            }
        } catch ({ message }) {
            
        }
    }

    useEffect(() => {
        onLoadFetchDoubleEntryDashboard();

        return () => {
            setDashboardData(DASHBOARD_DATA_DEFAULT_PROPS);
        }
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Header 
                            dateFrom={ dateFrom } 
                            dateTo={ dateTo } 
                            handleChangeDateFrom={ handleChangeDateFrom }
                            handleChangeDateTo={ handleChangeDateTo }
                            handleClickUpdateDashboard={ handleClickUpdateDashboard }
                            handleClickResetDashboard= { onLoadFetchDoubleEntryDashboard }
                        />
                    </Grid>
                    {/* Cards */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Cards 
                            totalExpense={ dashboardData.totalExpense }
                            totalIncome={ dashboardData.totalIncome }
                            totalProfit={ dashboardData.totalProfit }
                            receivables={ dashboardData.receivables }
                            payables={ dashboardData.payables }
                            upcoming={ dashboardData.upcoming }
                        />
                    </Grid>
                    {/* Cash flow */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CashFlowChart cashFlow={ dashboardData.cashFlow }/>
                    </Grid>
                    {/* Income and Expense By COA */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                <IncomeByCOA incomeByChartOfAccounts={ dashboardData.incomeByChartOfAccounts  }/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                <ExpenseByCOA expenseByChartOfAccounts={ dashboardData.expenseByChartOfAccounts  }/>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Account Balance, Latest Income by COA, Latest Expense by COA */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={1} justify='center'>
                            <Grid item xs={12} sm={8} md={8} lg={8}>
                                <AccountBalance accountBalances={ dashboardData.accountBalances } />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <LatestIncomeByCOA latestIncomeByChartOfAccounts={ dashboardData.latestIncomeByChartOfAccounts }/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <LatestExpenseByCOA latestExpenseByChartOfAccounts={ dashboardData.latestExpenseByChartOfAccounts }/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default DoubleEntryDashboard
