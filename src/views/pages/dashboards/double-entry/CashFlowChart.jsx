import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import ReactHighcharts from 'highcharts-react-official'

HighchartsExporting(Highcharts);


const CashFlowChart = ({ cashFlow }) => 
{
    const { monthlyExpenseByChartOfAccounts, monthlyIncomeByChartOfAccounts, monthlyProfitByChartOfAccounts} = cashFlow;
    const [ chartKey, setChartKey ] = useState((new Date()).toISOString());

    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Cash flow'
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
            categories: [
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
            ],
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
        series: [
            {
                name: 'Income',
                data: monthlyIncomeByChartOfAccounts,
                color: '#2196f3'
            }, 
            {
                name: 'Expense',
                data: monthlyExpenseByChartOfAccounts,
                color: '#f44336'
            },
            {
                name: 'Profit',
                data: monthlyProfitByChartOfAccounts,
                color: '#4caf50'
            }
        ]
    };

    useEffect(() => {
        window.addEventListener('resize', () => setChartKey((new Date()).toISOString()))
    }, []);

    return (
        <>
            <ReactHighcharts 
                 key={ chartKey }
                 highcharts={ Highcharts } 
                 options={ options }
            />
        </>
    )
}

export default CashFlowChart
