import React from 'react'

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import { Table, TableBody, TableRow } from '@material-ui/core'
import { Card, CardContent } from '@material-ui/core'
import MuiTableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles';

const TableCell = withStyles({
    root: {
        borderBottom: 'none'
    }
})(MuiTableCell);

const EmployeeProfile = ({ employee }) => 
{
    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell><strong>Name</strong></TableCell>
                                                <TableCell align='left'>{ employee.name }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Birth day</strong></TableCell>
                                                <TableCell align='left'>{ employee.birth_date }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Position</strong></TableCell>
                                                <TableCell align='left'>{ employee?.role }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Email</strong></TableCell>
                                                <TableCell align='left'>{ employee.email }</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} />
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default EmployeeProfile
