import React, { useState, useEffect } from 'react'

/** API */
import taxSummaryAsync from './../../../../services/reports/accounting/tax.summary';

/** Material UI Components */
import { Table, TableCell, TableBody, TableHead, TableRow } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

/** Utils */
import * as DATE_HELPER from '../../../../utils/date'


const taxSummaryTableData = (taxSummaryData) => 
{
    let elem = [];
    let total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let sales = [];
    let purchase = [];

    for (const key in taxSummaryData) 
    {
        if (taxSummaryData[key]) {
            elem.push(
                <TableRow key={ key }>
                    <TableCell>{ key.replace(key[0], key[0].toUpperCase()) }</TableCell>
                    {
                        taxSummaryData[key].map((data, index) => (
                            <TableCell align='left' key={ index }>{ parseFloat(data).toFixed(2) }</TableCell>
                        ))
                    }
                    <TableCell align='left' key={ 'total' }>
                        { taxSummaryData[key].reduce((total, curValue) => total + parseFloat(curValue), 0).toFixed(2) }
                    </TableCell>
                </TableRow>
            );
        }
    }

    for (const key in taxSummaryData) 
    {
        if (taxSummaryData[key] && key === 'sales') {
            sales = taxSummaryData[key];
        }

        if (taxSummaryData[key] && key === 'purchase') {
            purchase = taxSummaryData[key];
        }
    }

    total = total.map((value, index) => parseFloat(sales[index]) - parseFloat(purchase[index]));

    elem.push(
        <TableRow key='key'>
            <TableCell><strong>NET</strong></TableCell>
            {
                total.map((data, index) => (
                    <TableCell align='left' key={ index }><strong>{ data.toFixed(2) }</strong></TableCell>
                ))
            }
            <TableCell align='left' key={ 'totalNet' }>
                <strong>{  total.reduce((totalVal, curVal) => totalVal + curVal, 0).toFixed(2) }</strong>
            </TableCell>
        </TableRow>
    )

    return elem;
}

const taxSummaryTable = (taxSummaries) => 
{
    let elem = [];

    for (const key in taxSummaries) 
    {
        if (taxSummaries[key]) {
            elem.push(
                <Grid item xs={12} sm={12} md={12} lg={12} key={ key }>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{ key.split('_').map(splittedKey => splittedKey.toUpperCase()).join(' ') }</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{ taxSummaryTableData(taxSummaries[key]) }</TableBody>
                    </Table>
                </Grid>
            );
        }
    }

    return elem;
}

const TaxSummary = () => 
{
    const [ taxSummaries, setTaxSummaries ] = useState({});

    const fetchTaxSummaryReport = async () => 
    {
        try {
            const { data, message, status } = await taxSummaryAsync();

            if (status !== 'success') {
    
            }
    
            if (status === 'success') {
                setTaxSummaries(data);
            }
        } catch ({ message }) {

        }
    }

    useEffect(() => {
        fetchTaxSummaryReport();
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                {
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant='subtitle1' color='textSecondary'>Category</Typography></TableCell>
                                    {
                                        DATE_HELPER.MONTH_NAMES.map((month, index) => (
                                            <TableCell key={ index }>
                                                <Typography variant='subtitle2' color='textSecondary'>{ month }</Typography>
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                        </Table>
                    </Grid>
                }
                {
                    taxSummaryTable(taxSummaries)
                }
            </Grid>
        </>
    )
}

export default TaxSummary