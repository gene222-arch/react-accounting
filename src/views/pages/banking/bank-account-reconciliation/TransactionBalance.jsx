import React from 'react'
import clsx from 'clsx'

import Grid from '@material-ui/core/Grid'
import { Table, TableRow, TableCell, TableBody, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const transactionBalanceUseStyles = makeStyles(theme => ({
    amountCleared: {
        backgroundColor: theme.palette.success.main,
        color: '#FFF'
    },
    amountNotCleared: {
        backgroundColor: theme.palette.error.main,
        color: '#FFF'
    }
}));


const TransactionBalance = ({ openingBalance, closingBalance, clearedAmount, difference, handleClickReconcile, handleClickSave, handleClickCancel }) => 
{
    const classes = transactionBalanceUseStyles();

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6}></Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><strong>Opening Balance:</strong></TableCell>
                                <TableCell>{ openingBalance }</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Closing Balance:</strong></TableCell>
                                <TableCell>{ closingBalance }</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Cleared Amount:</strong></TableCell>
                                <TableCell>{ clearedAmount }</TableCell>
                            </TableRow>
                            <TableRow className={clsx({
                                [classes.amountCleared]: parseFloat(difference) === 0,
                                [classes.amountNotCleared]: parseFloat(difference) < 0
                            })}>
                                <TableCell><strong>Difference:</strong></TableCell>
                                <TableCell>{ difference }</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid> 
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1} justify='flex-end'>
                        <Grid item>
                                <Button 
                                    variant="contained" 
                                    color="default"
                                    onClick={ handleClickCancel }
                                >Cancel</Button>
                        </Grid>
                        <Grid item>
                                <Button 
                                    variant="contained" 
                                    color="default"
                                    onClick={ handleClickReconcile }
                                    disabled={ parseFloat(difference) !== 0 }
                                >Reconcile</Button>
                        </Grid>
                        <Grid item>
                                <Button 
                                    variant="contained" 
                                    color="default"
                                    onClick={ handleClickSave }
                                >Save</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default TransactionBalance
