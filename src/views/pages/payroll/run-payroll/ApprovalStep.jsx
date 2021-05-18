import React from 'react'
import { format } from 'date-fns'
import { KeyboardDatePicker } from '@material-ui/pickers';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import { Card, CardContent } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

/** Components */
import MaterialTable from '../../../../components/MaterialTable'
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';

import PATH from './../../../../routes/path';

const ApprovalStep = ({ runPayrollState, setRunPayrollState, employeesState, error }) => 
{
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Name', 
            field: 'name', 
            render: ({ id, name }) => <StyledNavLink to={ PATH.VIEW_EMPLOYEE.replace(':id', id)} text={ name } />
        },
        { title: 'Position',  field: 'position' },
        { title: 'Salary',  field: 'salary' },
        { title: 'Benefit',  field: 'benefit' },
        { title: 'Deduction',  field: 'deduction' },
        { title: 'Total Amount',  field: 'total_amount' },
    ];

    const options = {
        selection: false,
        search: false
    };

    const handleChangePaymentDate = (date) => setRunPayrollState({ ...runPayrollState, payment_date: format(date, 'Y-m-d') });

    
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <InputLabel id='payment_date'>Payment date</InputLabel>
                            <KeyboardDatePicker
                                error={ Boolean(error.payment_date) }
                                helperText={ error.payment_date }
                                id='payment_date'
                                name='payment_date'
                                variant='inline'
                                format='yyyy-MM-dd'
                                margin='normal'
                                value={ runPayrollState.payment_date }
                                onChange={ handleChangePaymentDate }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                fullWidth
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MaterialTable
                        columns={ columns }
                        data={ employeesState }
                        title='Ready to approve'
                        options={ options }
                    /> 
                </Grid>
            </Grid>
        </>
    )
}

export default ApprovalStep
