import React from 'react'

/** Material UI Components */
import { Card, CardContent, CardHeader } from '@material-ui/core'
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

import PersonIcon from '@material-ui/icons/Person';


const EmployeeProfile = ({ employeesState, selectedEmployeeId, employeeProfile, handleChangeSelectedEmployee }) => 
{
    return (
        <>
            <Card>
                <CardHeader title='Employee Profile Information' />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl fullWidth>
                                <InputLabel id='selectedEmployeeId'><strong>Employee</strong></InputLabel>
                                <Select
                                    id='selectedEmployeeId'
                                    name='selectedEmployeeId'
                                    IconComponent={ PersonIcon }
                                    value={ selectedEmployeeId }
                                    onChange={ handleChangeSelectedEmployee }
                                    fullWidth
                                    label='Select Employee'
                                >
                                    {
                                        employeesState.map(({ id, name }) => (
                                            <MenuItem key={ id } value={ id }>{ name }</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Salary</strong></TableCell>
                                        <TableCell align='right'>{ parseFloat(employeeProfile.salary).toFixed(2) }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Benefits</strong></TableCell>
                                        <TableCell align='right'>{ parseFloat(employeeProfile.benefit).toFixed(2) }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Deductions</strong></TableCell>
                                        <TableCell align='right'>{ parseFloat(employeeProfile.deduction).toFixed(2) }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Total Amount</strong></TableCell>
                                        <TableCell align='right'>{ parseFloat(employeeProfile.total_amount).toFixed(2) }</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default EmployeeProfile
