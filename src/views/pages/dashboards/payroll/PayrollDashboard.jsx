import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import ReactHighcharts from 'highcharts-react-official'

/** API */
import fetchDashboardAsync from './../../../../services/dashboards/payroll.dashboard';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'

/** Material UI Icons */
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import PayrollCard from './PayrollCard';

import * as DATE_HELPER from '../../../../utils/date'
import Header from './Header';
import MaterialTable from './../../../../components/MaterialTable';


HighchartsExporting(Highcharts);

const DATES_DEFAULT_PROPS = {
    date_from: DATE_HELPER.today(),
    date_to: DATE_HELPER.today()
};

const DASHBOARD_DATA_DEFAULT_PROPS = {
    generalAnalytics: {
        total_payrolls: 0,
        total_pay_calendars: 0,
        total_employees: 0
    },
    latestPayrolls: [],
    monthlyExpense: []
};

const PayrollDashboard = () => 
{
    const [ chartKey, setChartKey ] = useState((new Date()).toISOString());
    const [ dates, setDates ] = useState(DATES_DEFAULT_PROPS);
    const [ dashboardData, setDashboardData ] = useState(DASHBOARD_DATA_DEFAULT_PROPS);

    const columns = [
        { field: 'id', hidden: true },
        { title: 'Name', field: 'name' },
        { title: 'From date', field: 'from_date' },
        { title: 'To date', field: 'to_date' },
        { title: 'Payment date', field: 'payment_date' },
        { title: 'Employees', field: 'employees', type: 'numeric' },
        { title: 'Status', field: 'status' },
        { title: 'Amount', field: 'amount', type: 'numeric' }
    ];

    const options = {
        selection: false,
        headerStyle: {
            backgroundColor: '#64b5f6',
            color: '#FFF',
            fontWeight: 500
        }
    };

    const chartOptions = {
        chart: {
            type: 'spline',
            events: {
                load() {
                    const chart = this;
                    chart.showLoading('Loading data sets ...');

                    setTimeout(() => {
                        chart.hideLoading();
                    }, 1000);
                }
            }
        },
        title: {
            text: 'Income'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
            categories: DATE_HELPER.MONTH_NAMES,
        },
        tooltip: {
            shared: true,
            pointFormat: '{series.name}: <b>{point.y:.2f}</b><br/>',
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'Expense',
            data: dashboardData.monthlyExpense.map(val => parseFloat(val)),
            color: '#f44336'
        }]
    };

    const handleChangeDateFrom = date => setDates({ ...dates, date_from: format(date, 'yyyy-MM-dd') });

    const handleChangeDateTo = date => setDates({ ...dates, date_to: format(date, 'yyyy-MM-dd') });

    const onLoadFetchPayrollDashboard =  async () => 
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
            const { data, message, status } = await fetchDashboardAsync(dates);
            
            if (status !== 'success') {

            }

            if (status === 'success') {
                setDashboardData(data);
            }
        } catch ({ message }) {
            
        }
    }

    useEffect(() => {
        onLoadFetchPayrollDashboard();
        window.addEventListener('resize', () => setChartKey((new Date()).toISOString()));
        return () => {
            setDashboardData(DASHBOARD_DATA_DEFAULT_PROPS);
        }
    }, []);


    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Header
                        dateFrom={ dates.date_from }
                        dateTo={ dates.date_to }
                        handleChangeDateFrom={ handleChangeDateFrom }
                        handleChangeDateTo={ handleChangeDateTo }
                        handleClickUpdateDashboard={ handleClickUpdateDashboard }
                        handleClickResetDashboard={ onLoadFetchPayrollDashboard }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <PayrollCard
                                cardTitle='TOTAL PAYROLLS'
                                subheader={ dashboardData.generalAnalytics.total_payrolls }
                                Icon={ DateRangeIcon }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <PayrollCard
                                cardTitle='TOTAL PAY CALENDARS'
                                subheader={ dashboardData.generalAnalytics.total_pay_calendars }
                                Icon={ EventAvailableIcon }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <PayrollCard
                                cardTitle='TOTAL EMPLOYEES'
                                subheader={ dashboardData.generalAnalytics.employees }
                                Icon={ PeopleAltIcon }
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MaterialTable
                        columns={ columns }
                        options={ options }
                        data={ dashboardData.latestPayrolls }
                        title='Latest 5 Pay Run Records'
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ReactHighcharts 
                        key={ chartKey }
                        highcharts={ Highcharts } 
                        options={ chartOptions }
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default PayrollDashboard
