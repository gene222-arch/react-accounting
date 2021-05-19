import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import ReactHighcharts from 'highcharts-react-official'

/** API */
import incomeSummaryAsync from './../../../../services/reports/income.summary';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import { Table, TableHead, TableCell, TableBody, TableRow, Typography } from '@material-ui/core'

/** Utils */
import * as NUMERIC_HELPER from '../../../../utils/numeric'
import * as DATE_HELPER from '../../../../utils/date'

HighchartsExporting(Highcharts);

const MONTHLY_EXPENSE_DEFAULT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const incomeSummaryPerCategoryTable = (object) => 
{
    let elem = [];
    let totalElem = <TableRow></TableRow>
    let total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (const key in object) {
        if (object[key]) {
            elem.push(
                (
                    <TableRow key={ key }>
                        <TableCell>
                            <Typography variant='subtitle2' color='textSecondary'>{ key }</Typography>
                        </TableCell>
                        {
                            object[key]?.map((data, index) => (
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

    for (const key in object) {
        if (object[key]) {
            totalElem = (
                (
                    <TableRow key={ 'total' }>
                        <TableCell>
                            <Typography variant='subtitle1' color='textSecondary'>
                                <strong>Total</strong>
                            </Typography>
                        </TableCell>
                        {
                            object[key]?.map((data, index) => (
                                <TableCell key={ index }>
                                    <Typography variant='subtitle1' color='textSecondary'>
                                        <strong>
                                            { NUMERIC_HELPER.thousandsSeparators((total[index] += parseFloat(data))?.toFixed(2)) }
                                        </strong>
                                    </Typography>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                )
            )
        }
    }

    elem.push(totalElem);

    return elem;
}

const IncomeSummary = () => 
{
    const [ chartKey, setChartKey ] = useState((new Date()).toISOString());
    const [ monthlyExpenseSummary, setMonthlyIncomeSummary ] = useState(MONTHLY_EXPENSE_DEFAULT);
    const [ incomePerCategory, setIncomePerCategory ] = useState({});

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
            data: monthlyExpenseSummary,
            color: '#f44336'
        }]
    };

    const onLoadFetchIncomeSummary = async () => 
    {
        try {
            const { data, message, status } = await incomeSummaryAsync();

            if (status !== 'success') {
            }

            if (status === 'success') 
            {
                const { incomeSummaryPerCategory, monthlyIncomeSummary: monthlyIncomes } = data;
                
                setMonthlyIncomeSummary(monthlyIncomes.map(income => parseFloat(income)));
                setIncomePerCategory(incomeSummaryPerCategory);
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
                                DATE_HELPER.MONTH_NAMES.map((month, index) => (
                                    <TableCell key={ index }>
                                        <Typography variant='subtitle2' color='textSecondary'>{ month }</Typography>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { incomeSummaryPerCategoryTable(incomePerCategory) }
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    )
}

export default IncomeSummary
