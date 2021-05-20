import React, { useState, useEffect } from 'react'

/** API */
import generalLedgerAsync from './../../../../services/reports/accounting/general.ledger';

/** Material UI Components */
import { Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

/** Utils */
import * as DATE_HELPER from '../../../../utils/date'
import * as STRING_HELPER from '../../../../utils/string'


const displayGeneralLedgerData = (generalLedgerDataSet) => 
{
    return generalLedgerDataSet.map(({ date, description, credit, debit }, index) => (
        <TableRow key={ index }>
            <TableCell>{ date }</TableCell>
            <TableCell>{ description ?? '' }</TableCell>
            <TableCell>{ debit }</TableCell>
            <TableCell>{ credit }</TableCell>
            <TableCell>{ (parseFloat(credit) + parseFloat(debit)).toFixed(2) }</TableCell>
        </TableRow>
    ));
}

const displayGeneralLedgerTable = (generalLedger) => 
{
    let elem = [];

    for (const key in generalLedger) {
        if (generalLedger[key]) {
            elem.push(
                <Grid item xs={12} sm={12} md={12} lg={12} key={ key }>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h5" color="initial">
                                { STRING_HELPER.kebabCaseToTitle(key) }
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Debit</TableCell>
                                        <TableCell>Credit</TableCell>
                                        <TableCell>Balance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { displayGeneralLedgerData(generalLedger[key]) }
                                    <TableRow>
                                        <TableCell><strong>Totals and Closing Balance</strong></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <strong>
                                            { 
                                                generalLedger[key].reduce((total, { debit }) => total + parseFloat(debit), 0).toFixed(2)
                                            }
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>
                                            { 
                                                generalLedger[key].reduce((total, { credit }) => total + parseFloat(credit), 0).toFixed(2)
                                            }
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>
                                            { 
                                                generalLedger[key].reduce((total, { credit, debit }) => total + (
                                                    parseFloat(debit) - parseFloat(credit)
                                                ), 0).toFixed(2)
                                            }
                                            </strong>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Balance Change</strong></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <strong>
                                            { 
                                                generalLedger[key].reduce((total, { credit, debit }) => total + (
                                                    parseFloat(debit) - parseFloat(credit)
                                                ), 0).toFixed(2)
                                            }
                                            </strong>
                                        </TableCell>
                                    </TableRow>
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

const GeneralLedger = () => 
{

    const [ generalLedger, setGeneralLedger ] = useState({});

    const fetchGeneralLedger = async () => 
    {
        try {
            const { data, message, status } = await generalLedgerAsync();

            if (status !== 'success') {

            }

            if (status === 'success') {
                setGeneralLedger(data);
            }
        } catch ({ message }) {

        }
    }

    useEffect(() => {
        fetchGeneralLedger();
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={7}>
                    { displayGeneralLedgerTable(generalLedger) }
                </Grid>
            </Container>
        </>
    )
}

export default GeneralLedger
