import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from './EmployeePayrollCard';
import MaterialTable from './../../../../components/MaterialTable';



const EmployeePayroll = ({ payrolls }) => 
{
    const { totalPayment,  totalBenefit,  totalDeduction,  paymentHistories, benefitHistories, contributionHistories, taxHistories } = payrolls;

    const paymentHistoryColumns = [
        { field: 'id', hidden: true },
        { title: 'Date', field: 'paymentDate' },
        { title: 'Name', field: 'name' },
        { title: 'Total Benefit', field: 'totalBenefit', type: 'numeric' },
        { title: 'Total Deduction', field: 'totalDeduction', type: 'numeric' },
        { title: 'Salary', field: 'totalDeduction', type: 'numeric' },
        { title: 'Total', field: 'totalPayment', type: 'numeric' }
    ];

    const benefitHistoryColumns = [
        { field: 'id', hidden: true },
        { title: 'Type', field: 'type' },
        { title: 'Amount', field: 'amount' },
    ];

    const contributionHistoryColumns = [
        { field: 'id', hidden: true },
        { title: 'Name', field: 'name' },
        { title: 'Amount', field: 'amount' },
    ];

    const taxHistoryColumns = [
        { field: 'id', hidden: true },
        { title: 'Name', field: 'name' },
        { title: 'Amount', field: 'amount' },
    ];

    const options = {
        selection: false,
        headerStyle: {
            backgroundColor: '#64b5f6',
            color: '#FFF',
            fontWeight: 500
        }
    };

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Card title={ 'TOTAL PAYMENT' } amount={ totalPayment } />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Card title={ 'TOTAL BENEFIT' } amount={ totalBenefit } />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Card title={ 'TOTAL DEDUCTION' } amount={ totalDeduction } />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MaterialTable 
                        columns={ paymentHistoryColumns }
                        data={ paymentHistories }
                        options={ options }
                        title='Payment History'
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1} justify='center'>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <MaterialTable 
                                columns={ benefitHistoryColumns }
                                data={ benefitHistories }
                                options={ options }
                                title='Benefit History'
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <MaterialTable 
                                columns={ contributionHistoryColumns }
                                data={ contributionHistories }
                                options={ options }
                                title='Contribution History'
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <MaterialTable 
                                columns={ taxHistoryColumns }
                                data={ taxHistories }
                                options={ options }
                                title='Tax History'
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default EmployeePayroll
