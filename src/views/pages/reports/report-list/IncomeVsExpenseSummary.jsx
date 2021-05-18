import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import ReactHighcharts from 'highcharts-react-official'

/** API */
import incomeVsExpenseSummaryAsync from './../../../../services/reports/income.vs.expense.summary';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import { Table, TableHead, TableCell, TableBody, TableRow, Typography } from '@material-ui/core'

import * as NUMERIC_HELPER from '../../../../utils/numeric'

HighchartsExporting(Highcharts);

const MONTHLY_EXPENSE_DEFAULT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];


const incomeAndExpenseSummaryTable = (incomeAndExpenseCategories, monthlyIncomeVsExpense) => 
{
    let elem = [];
    let totalElem = <TableRow></TableRow>

    for (const key in incomeAndExpenseCategories) {
        if (incomeAndExpenseCategories[key]) {
            elem.push(
                (
                    <TableRow key={ key }>
                        <TableCell>
                            <Typography variant='subtitle2' color='textSecondary'>{ key }</Typography>
                        </TableCell>
                        {
                            incomeAndExpenseCategories[key]?.map((data, index) => (
                                <TableCell key={ index }>
                                    <Typography variant='subtitle1' color='textSecondary'>
                                        { NUMERIC_HELPER.thousandsSeparators(parseFloat(data).toFixed(2))}
                                    </Typography>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                )
            )
        }
    }

    totalElem = (
            <TableRow key={ 'total' }>
                <TableCell>
                    <Typography variant='subtitle1' color='textSecondary'>
                        <strong>Total</strong>
                    </Typography>
                </TableCell>
                {
                    monthlyIncomeVsExpense?.map((data, index) => (
                        <TableCell key={ index }>
                            <Typography variant='subtitle1' color='textSecondary'>
                                <strong>
                                    { NUMERIC_HELPER.thousandsSeparators((parseFloat(data)).toFixed(2)) }
                                </strong>
                            </Typography>
                        </TableCell>
                    ))
                }
            </TableRow>
    );

    elem.push(totalElem);

    return elem;
}

const IncomeVsExpenseSummary = () => 
{
    const [ chartKey, setChartKey ] = useState((new Date()).toISOString());
    const [ monthlyIncomeVsExpense, setMonthlyIncomeVsExpense ] = useState(MONTHLY_EXPENSE_DEFAULT);
    const [ monthlyIncVsExpCategories, setMonthlyIncVsExpCategories ] = useState({});

    const options = {
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
            text: 'Income vs Expense'
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
            categories: MONTH_NAMES,
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
            name: 'Income vs Expense',
            data: monthlyIncomeVsExpense,
            color: '#f44336'
        }]
    };

    const onLoadFetchIncomeSummary = async () => 
    {
        try {
            const { data, message, status } = await incomeVsExpenseSummaryAsync();

            console.log(data)

            if (status !== 'success') {
            }

            if (status === 'success') 
            {
                const { incomeAndExpensePerCategory, monthlyIncomeVsExpense: incomeVsExpenses } = data;
                
                setMonthlyIncomeVsExpense(incomeVsExpenses.map(incomeVsExpense => parseFloat(incomeVsExpense)));
                setMonthlyIncVsExpCategories(incomeAndExpensePerCategory);
            }
        } catch ({ message }) {

        }
    }


    useEffect(() => {
        window.addEventListener('resize', () => setChartKey((new Date()).toISOString()));
        onLoadFetchIncomeSummary();
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <ReactHighcharts 
                    key={ chartKey }
                    highcharts={ Highcharts } 
                    options={ options }
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant='subtitle1' color='textSecondary'>Category</Typography></TableCell>
                            {
                                MONTH_NAMES.map((month, index) => (
                                    <TableCell key={ index }>
                                        <Typography variant='subtitle2' color='textSecondary'>{ month }</Typography>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { incomeAndExpenseSummaryTable(monthlyIncVsExpCategories, monthlyIncomeVsExpense) }
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    )
}

export default IncomeVsExpenseSummary
