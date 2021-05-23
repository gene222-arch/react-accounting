import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

/** API */
import fetchDashboardAsync from './../../../../services/dashboards/main.dashboard';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'

/** Utils */
import * as DATE from '../../../../utils/date'
import Header from './Header';
import Cards from './Cards';
import CashFlowChart from './CashFlowChart';
import IncomeByCategory from './IncomeByCategory';
import ExpenseByCategory from './ExpenseByCOA';
import AccountBalance from './AccountBalance';
import Currency from './Currency';
import LatestIncomeByCategory from './LatestIncomeByCategory';
import LatestExpenseByCategory from './LatestExpenseByCategory';


const DASHBOARD_DATA_DEFAULT_PROPS = 
{
    generalAnalytics: {
        totalIncome: 0,
        totalExpense: 0,
        payables: 0,
        totalProfit: 0,
        receivables: 0,
        upcoming: 0
    },
    accountBalances: [],
    currencies: [],
    latestExpensesByCategory: [],
    latestIncomeByCategory: [],
    incomeByCategory: [],
    expenseByCategory: [],
    cashFlow: {
        monthlyExpense: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        monthlyIncome: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        monthlyProfit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
};


const MainDashboard = () => 
{
    const [ dateFrom, setDateFrom ] = useState(DATE.today());
    const [ dateTo, setDateTo ] = useState(DATE.today());
    const [ dashboardData, setDashboardData ] = useState(DASHBOARD_DATA_DEFAULT_PROPS);

    const handleChangeDateFrom = date => setDateFrom(format(date, 'yyyy-MM-dd'));

    const handleChangeDateTo = date => setDateTo(format(date, 'yyyy-MM-dd'));

    const onLoadFetchMainDashboardData = async () => 
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
        onLoadFetchMainDashboardData();
    }, []);

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Header 
                        dateFrom={ dateFrom }
                        dateTo={ dateTo }
                        handleChangeDateFrom={ handleChangeDateFrom }
                        handleChangeDateTo={ handleChangeDateTo }
                        handleClickUpdateDashboard={ handleClickUpdateDashboard }
                        handleClickResetDashboard={ onLoadFetchMainDashboardData }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Cards generalAnalytics={ dashboardData.generalAnalytics }/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <CashFlowChart cashFlow={ dashboardData.cashFlow }/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <IncomeByCategory incomeByCategory={ dashboardData.incomeByCategory }/>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <ExpenseByCategory expenseByCategory={ dashboardData.expenseByCategory }/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <LatestIncomeByCategory latestIncomeByCategory={ dashboardData.latestIncomeByCategory }/>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <LatestExpenseByCategory latestExpenseByCategory={ dashboardData.latestExpensesByCategory }/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <AccountBalance accountBalances={ dashboardData.accountBalances }/>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Currency currencies={ dashboardData.currencies } />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default MainDashboard
