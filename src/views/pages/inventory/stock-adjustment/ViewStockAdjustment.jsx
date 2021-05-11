import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** API */
import { findAsync } from '../../../../services/inventory/stock.adjustment'

/** Selectors */
import { selectStockAdjustment } from './../../../../redux/modules/stock-adjustment/selector';

/** Components */
import MaterialTable from '../../../../components/MaterialTable'

/** Material UI Components */
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Card, CardContent } from '@material-ui/core'
import { Table, TableRow, TableBody } from '@material-ui/core'
import MuiTableCell from '@material-ui/core/TableCell'
import Divider from '@material-ui/core/Divider'
import { withStyles, Button } from '@material-ui/core'

/** Material UI Icons */
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import PATH from './../../../../routes/path';


const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);


const ViewStockAdjustment = ({ stockAdjustmentProp, match }) => 
{
    const history = useHistory();

    const { id } = match.params;
    const { isLoading, stockAdjustment } = stockAdjustmentProp;

    const [ stockAdjustmentState, setStockAdjustmentState ] = useState(stockAdjustment);
    const [ items, setItems ] = useState([]);


    const columns = [
        { field: 'stock_id', hidden: true },
        { title: 'Item', field: 'item' },
        { 
            title: 'Book Quantity', 
            field: 'book_quantity',
            cellStyle: {
                textAlign: 'center'
            }
        },
        { 
            title: 'Quantity', 
            field: 'quantity',
            cellStyle: {
                textAlign: 'center'
            }
        },
        { 
            title: 'Physical Quantity', 
            field: 'physical_quantity',
            cellStyle: {
                textAlign: 'center'
            }
        },
        { title: 'Unit price', field: 'unit_price' },
        { title: 'Amount', field: 'amount' }
    ];

    const options = {
        selection: false,
        search: false
    };

    const onLoadFetchStockAdjustmentById = async () => 
    {
        const { data, message, status } = await findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') {
            const { details, ...stockAdjustment } = data;

            setStockAdjustmentState(stockAdjustment);
            setItems(details.map(({ pivot }) => pivot));
        }
    }

    useEffect(() => {
        onLoadFetchStockAdjustmentById();
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" color="initial">{ stockAdjustmentState.stock_adjustment_number }</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" color="initial">Profile</Typography>
                                    <Divider />
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell><strong>Adjusted by</strong></TableCell>
                                                <TableCell>{ stockAdjustmentState.adjusted_by }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Date</strong></TableCell>
                                                <TableCell>{ stockAdjustmentState.created_at }</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" color="initial">Reason</Typography>
                                    <Divider />
                                    <Typography variant="subtitle1" color="initial">{ stockAdjustmentState.reason }</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={ () => history.push(PATH.STOCK_ADJUSTMENT) }
                                fullWidth
                            >
                                <ArrowBackIosIcon fontSize='small'/> Stock adjustments
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                    <MaterialTable
                        columns={ columns }      
                        data={ items }  
                        options={ options }
                        title='Items'
                    />  
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    stockAdjustmentProp: selectStockAdjustment
});

export default connect(mapStateToProps, null)(ViewStockAdjustment)
