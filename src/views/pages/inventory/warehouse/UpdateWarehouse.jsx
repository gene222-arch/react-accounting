import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectWarehouse } from '../../../../redux/modules/warehouse/selector';
import { selectItem } from '../../../../redux/modules/item/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** API */
import { findAsync } from '../../../../services/inventory/warehouse'

/** Actions */
import * as WAREHOUSE from '../../../../redux/modules/warehouse/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import { FormControlLabel } from '@material-ui/core'
import { Card, CardContent, CardActions } from '@material-ui/core'
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from '../../../../components/SaveCancelButtons';
import AlertPopUp from '../../../../components/AlertPopUp';

import PATH from '../../../../routes/path';
import SelectItems from './SelectItems';

const UpdateWarehouse = ({ alert, warehouseProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, warehouse, error } = warehouseProp;

    const [ warehouseState, setWarehouseState ] = useState(warehouse);
    const [ items, setItems ] = useState([]);

    const handleChange = (e) => 
    {
        const { name, value, checked } = e.target;
        
        if (name === 'default_warehouse') {
            setWarehouseState({ ...warehouseState, default_warehouse: checked });
        }

        if (name === 'enabled') {
            setWarehouseState({ ...warehouseState, enabled: checked });
        }

        if (name !== 'enabled' && name !== 'default_warehouse') {
            setWarehouseState({ ...warehouseState, [name]: value });
        }
    }

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
                category: item.category.name
            })));
        }
    }

    const onSubmitUpdateWarehouse = (e) => dispatch(WAREHOUSE.updateWarehouse({
        ...warehouseState,
        stocks: items.map(({ stock_id }) => ({ stock_id }))
    }));


    useEffect(() => {
        onLoadFetchWarehouseById();
    }, []);


    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateWarehouse }>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InputLabel>Name</InputLabel>
                                        <TextField
                                            fullWidth
                                            name='name'
                                            error={ Boolean(error.name) }
                                            helperText={ error.name }
                                            label='Enter Name'
                                            value={ warehouseState.name }
                                            onChange={ handleChange }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InputLabel>Email</InputLabel>
                                        <TextField
                                            fullWidth
                                            name='email'
                                            error={ Boolean(error.email) }
                                            helperText={ error.email }
                                            label='Enter Email'
                                            value={ warehouseState.email }
                                            onChange={ handleChange }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InputLabel>Phone</InputLabel>
                                        <TextField
                                            fullWidth
                                            name='phone'
                                            error={ Boolean(error.phone) }
                                            helperText={ error.phone }
                                            label='Enter Phone'
                                            value={ warehouseState.phone }
                                            onChange={ handleChange }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InputLabel>Address</InputLabel>
                                        <TextField
                                            fullWidth
                                            name='address'
                                            error={ Boolean(error.address) }
                                            helperText={ error.address }
                                            label='Enter Address'
                                            value={ warehouseState.address }
                                            onChange={ handleChange }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Switch 
                                                    checked={ Boolean(warehouseState.default_warehouse) } 
                                                    onChange={ handleChange } 
                                                    name='default_warehouse' 
                                                />}
                                            label='Default warehouse'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Switch 
                                                    checked={ Boolean(warehouseState.enabled) } 
                                                    onChange={ handleChange } 
                                                    name='enabled' 
                                                />}
                                            label='Enabled'
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <SelectItems 
                            items={ items }
                            setItems={ setItems }
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <Divider />
                            <CardActions>
                                <SaveCancelButtons 
                                    isLoading={ isLoading }
                                    cancelBtnCallback={ () => history.push(PATH.WAREHOUSE) }
                                    saveBtnCallback={ onSubmitUpdateWarehouse }
                                />
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    itemProp: selectItem,
    warehouseProp: selectWarehouse
});

export default connect(mapStateToProps, null)(UpdateWarehouse)
