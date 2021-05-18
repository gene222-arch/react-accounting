import React,{ useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as PAYMENT_METHOD from './../../../../redux/modules/payment-method/actions';

/** Selectors */
import { selectPaymentMethod } from './../../../../redux/modules/payment-method/selector';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import { Card, CardContent, Avatar, CardHeader, IconButton } from '@material-ui/core'
import { Table, TableCell, TableRow, TableBody, TableHead, Typography, Button } from '@material-ui/core'

import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import PersonIcon from '@material-ui/icons/Person';
import PrintIcon from '@material-ui/icons/Print';


const EMPLOYEE_PROFILE_DEFAULT_PROPS = {
    id: '',
    name: '',
    salary: '',
    benefit: 0,
    deduction: 0,
    total_amount: 0,
    tax_number: '',
    bank_account_number: ''
};

const PaySlipsStep = ({ paymentMethodProp, employeesState, runPayrollState }) => 
{
    const paymentMethod = paymentMethodProp.paymentMethods.find(({ id }) => id === runPayrollState.payment_method_id);
    
    const [ selectedEmployeeId, setSelectedEmployeeId ] = useState(1);
    const [ employeePaySlip, setEmployeePaySlip ] = useState(EMPLOYEE_PROFILE_DEFAULT_PROPS);

    const findEmployeeById = (employeeId = null) => employeesState.find(({ id }) => id === employeeId);

    const handleChangeSelectEmployee = (e) => 
    {
        const { value } = e.target;
        const employeeId = parseInt(value);

        setSelectedEmployeeId(employeeId);
        setEmployeePaySlip(findEmployeeById(employeeId));
    };

    useEffect(() => {
        findEmployeeById(selectedEmployeeId);
    }, []);

    return (
        <>
            <Grid container spacing={3} justify='center' alignItems='center'>
                <Grid item item xs={12} sm={10} md={10} lg={10}>
                    <FormControl fullWidth>
                        <Select
                            IconComponent={ PersonIcon }
                            variant='outlined'
                            name='employee_id'
                            value={ selectedEmployeeId }
                            onChange={ handleChangeSelectEmployee }
                        >
                            {
                                employeesState.map(({ id, name }) => (
                                    <MenuItem key={ id } value={ id }>{ name }</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <Button variant="contained" color="primary" startIcon={ <PrintIcon /> } fullWidth>
                        Print PaySlip
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label=''>
                                    { employeePaySlip.name.substr(0, 1) }
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label=''>
                                <MoreVertIcon />
                                </IconButton>
                            }
                            title={ <Typography variant="h6" color="initial">{ employeePaySlip.name }</Typography> }
                            subheader=''
                        />

                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>PAYMENT DATE</TableCell>
                                                <TableCell>TAX NUMBER</TableCell>
                                                <TableCell>BANK ACCOUNT NUMBER</TableCell>
                                                <TableCell>PAYMENT METHOD</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{ runPayrollState.payment_date }</TableCell>
                                                <TableCell>{ employeePaySlip.tax_number }</TableCell>
                                                <TableCell>{ employeePaySlip.bank_account_number }</TableCell>
                                                <TableCell>{ paymentMethod?.name }</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <Divider />
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Position</TableCell>
                                                <TableCell>From Date</TableCell>
                                                <TableCell>To Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{ employeePaySlip.position }</TableCell>
                                                <TableCell>{ runPayrollState.from_date }</TableCell>
                                                <TableCell>{ runPayrollState.to_date }</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <Divider />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                            
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    paymentMethodProp: selectPaymentMethod
});

export default connect(mapStateToProps, null)(PaySlipsStep)