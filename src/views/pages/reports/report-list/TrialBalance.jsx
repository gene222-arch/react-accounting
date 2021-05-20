import React, { useState, useEffect } from 'react'

/** API */
import trialBalanceAsync from './../../../../services/reports/accounting/trial.balance';

/** Material UI Components */
import { Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

/** Utils */
import * as DATE_HELPER from '../../../../utils/date'
import * as STRING_HELPER from '../../../../utils/string'
import { makeStyles } from '@material-ui/core/styles';


const trialBalanceUseStyles = makeStyles(theme => ({
    table: {
        tableLayout: 'fixed',
        width: '100%'
    }
}));


const displayTrialBalanceData = (trialBalanceDataSet) => 
{
    return trialBalanceDataSet.map(({ name, credit, debit }, index) => (
        <TableRow key={ index }>
            <TableCell>{ name }</TableCell>
            <TableCell>{ debit }</TableCell>
            <TableCell>{ credit }</TableCell>
        </TableRow>
    ));
}

const displayTrialBalanceTable = (trialBalance) => 
{
    const classes = trialBalanceUseStyles();
    let elem = [];

    for (const key in trialBalance) {
        if (trialBalance[key]) {
            elem.push(
                <Grid item xs={12} sm={12} md={12} lg={12} key={ key }>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h5" color="initial">
                                { STRING_HELPER.kebabCaseToTitle(key) }
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Table className={ classes.table }>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Debit</TableCell>
                                        <TableCell>Credit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { displayTrialBalanceData(trialBalance[key]) }
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    }

    return elem;
}

const TrialBalance = () => 
{

    const [ trialBalance, setTrialBalance ] = useState({});

    const fetchTrialBalance = async () => 
    {
        try {
            const { data, message, status } = await trialBalanceAsync();

            if (status !== 'success') {

            }

            if (status === 'success') {
                setTrialBalance(data);
            }
        } catch ({ message }) {

        }
    }

    useEffect(() => {
        fetchTrialBalance();
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={7}>
                    { displayTrialBalanceTable(trialBalance) }
                </Grid>
            </Container>
        </>
    )
}

export default TrialBalance
