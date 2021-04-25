import React from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'highcharts-react-official'


const IncomeByCOA = ({ incomeByChartOfAccounts = [] }) => 
{
    const data = incomeByChartOfAccounts?.sort((a, b) => b.amount - a.amount)
        .map(({ name, amount }, index) => ({
            name,
            y: parseFloat(amount),
            sliced: !index,
            selected: !index
        }));

        console.log(data);
        
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: `Income by Chart of Accounts ${(new Date()).getFullYear()}`
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true,
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            floating: true,
            verticalAlign: 'top',
            x: 10,
            y: 50,
            labelFormatter: function () {
                return `${this.name} - ${this.y?.toFixed(2)}`
            }
        },
        series: [{
            name: 'Incomes',
            colorByPoint: true,
            data
        }]
    };

    return (
        <>
            <ReactHighcharts 
                highcharts={ Highcharts } 
                options={ options }
            />
        </>
    )
}

export default IncomeByCOA
