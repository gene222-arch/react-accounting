import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** API */
import { findAsync } from '../../../../services/inventory/warehouse'

/** Selectors */
import { selectWarehouse } from './../../../../redux/modules/warehouse/selector';

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

import PATH from './../../../../routes/path';


const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);


const ViewWarehouse = ({ warehouseProp, match }) => 
{
    const history = useHistory();

    const { id } = match.params;
    const { isLoading, warehouse } = warehouseProp;

    const [ warehouseState, setWarehouseState ] = useState(warehouse);
    const [ items, setItems ] = useState([]);

    const columns = [
        { field: 'item_id', hidden: true },
        { title: 'Item', field: 'item' },
        { title: 'Category', field: 'category' },
        { title: 'Quantity', field: 'quantity' },
        { title: 'Price', field: 'price' },
        { title: 'Cost', field: 'cost' },
        { 
            title: 'Enabled', 
            field: 'enabled',
            render: ({ enabled }) => (
                <Switch
                    checked={ Boolean(enabled) }
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            )
        },
    ];

    const options = {
        selection: false,
        search: false
    };

    const onLoadFetchWarehouseById = async () => 
    {
        const { data, message, status } = await findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') {
            const { stocks, ...warehouse } = data;

            setWarehouseState(warehouse);
            setItems(stocks.map(({ item, id, in_stock }) => ({
                ...item,
                stock_id: id,
                item: item.name,
                quantity: in_stock,
                category: item.category.name,
                enabled: item.is_for_sale
            })));
        }
    }

    useEffect(() => {
        onLoadFetchWarehouseById();
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" color="initial">{ warehouseState.name }</Typography>
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
                                                <TableCell><strong>Email</strong></TableCell>
                                                <TableCell>{ warehouseState.email }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Phone</strong></TableCell>
                                                <TableCell>{ warehouseState.phone }</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" color="initial">Address</Typography>
                                    <Divider />
                                    <TableCell>{ warehouseState.address }</TableCell>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={ () => history.push(PATH.UPDATE_WAREHOUSE.replace(':id', id)) }
                                fullWidth
                            >
                                Edit
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
    warehouseProp: selectWarehouse
});

export default connect(mapStateToProps, null)(ViewWarehouse)
