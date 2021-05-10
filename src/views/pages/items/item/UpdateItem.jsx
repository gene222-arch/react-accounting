import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** API */
import { findAsync } from '../../../../services/items/item'

/** Selectors */
import { selectItem } from './../../../../redux/modules/item/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectCategory } from './../../../../redux/modules/category/selector';

/** Actions */
import * as ITEM from './../../../../redux/modules/item/actions';
import * as CATEGORY from './../../../../redux/modules/category/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import { Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';


/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from './../../../../components/SaveCancelButtons';
import AlertPopUp from './../../../../components/AlertPopUp';
import TrackStock from './TrackStock';

import PATH from './../../../../routes/path';


const UpdateItem = ({ alert, categoryProp, itemProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, item: item_, error } = itemProp;

    const [ itemState, setItemState ] = useState(item_.item);
    const [ stockState, setStockState ] = useState(item_.stock);
    const [ trackStock, setTrackStock ] = useState(item_.track_stock);

    const handleClickTrackStock = () => setTrackStock(!trackStock);

    const handleChangeItem = (e) => {
        const { name, value, checked } = e.target;

        name === 'is_for_sale'
            ? setItemState({ ...itemState, is_for_sale: checked })
            : setItemState({ ...itemState, [name]: value });
    }

    const handleChangeStock = (e) => setStockState({ ...stockState, [e.target.name]: e.target.value });

    const onLoadFetchItemById = async () => {
        const { data, message, status } = await findAsync({ id });

        if (status !== 'success') {
            console.log(data)
        }

        if (status === 'success') {
            const { stock, ...item } = data;

            setItemState(item);
            setStockState(stock);
            setTrackStock(Boolean(stock));
        }
    }

    const onLoadFetchCategories = () => dispatch(CATEGORY.getCategories());

    const onSubmitUpdateItem = () => dispatch(ITEM.updateItem({
        id: itemState.id,
        item: itemState,
        stock: stockState,
        track_stock: trackStock,
    }));

    useEffect(() => {
        onLoadFetchItemById();
        onLoadFetchCategories();
    }, []);

    return (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        error={ Boolean(error.name) }
                                        helperText={ error.name }
                                        fullWidth
                                        name='name'
                                        label="Enter Name"
                                        value={ itemState.name }
                                        onChange={ handleChangeItem }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.category_id) } fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={ itemState.category_id }
                                            onChange={ handleChangeItem }
                                            inputProps={{
                                                name: 'category_id'
                                            }}
                                            fullWidth
                                        >
                                            {
                                                categoryProp.categories.map(({ id, name }) => (
                                                    <MenuItem key={ id } value={ id }>
                                                        { name }
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText>{ error.category_id || '' }</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControl component="fieldset" error={ Boolean(error.sold_by) }>
                                        <FormLabel component="legend">Sold by</FormLabel>
                                        <RadioGroup 
                                            aria-label="sold_by" 
                                            name="sold_by" 
                                            value={ itemState.sold_by } 
                                            onChange={ handleChangeItem }
                                        >
                                            <FormControlLabel value="each" control={<Radio />} label="Each" />
                                            <FormControlLabel value="weight" control={<Radio />} label="Weight" />
                                        </RadioGroup>
                                        <FormHelperText>{ error.sold_by || '' }</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        error={ Boolean(error.barcode) }
                                        helperText={ error.barcode }
                                        fullWidth
                                        name='barcode'
                                        label="Enter Barcode"
                                        value={ itemState.barcode }
                                        onChange={ handleChangeItem }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        error={ Boolean(error.sku) }
                                        helperText={ error.sku }
                                        fullWidth
                                        name='sku'
                                        label="Enter SKU"
                                        value={ itemState.sku }
                                        onChange={ handleChangeItem }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        error={ Boolean(error.description) }
                                        helperText={ error.description }                                    
                                        fullWidth
                                        name='description'
                                        label="Enter Description"
                                        value={ itemState.description }
                                        onChange={ handleChangeItem }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        error={ Boolean(error.price) }
                                        helperText={ error.price }     
                                        fullWidth
                                        name='price'
                                        label="Enter Sale Price"
                                        value={ itemState.price }
                                        onChange={ handleChangeItem }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        error={ Boolean(error.cost) }
                                        helperText={ error.cost }     
                                        fullWidth
                                        name='cost'
                                        label="Enter Purchase Price"
                                        value={ itemState.cost }
                                        onChange={ handleChangeItem }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        error={ Boolean(error.image) }
                                        helperText={ error.image }     
                                        fullWidth
                                        name='image'
                                        label="Picture"
                                        value={ itemState.image }
                                        onChange={ handleChangeItem }
                                        type='file'
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={ itemState.is_for_sale }
                                                onChange={ handleChangeItem }
                                                name="is_for_sale"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        }
                                        label="Available for sale"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={ trackStock }
                                                onChange={ handleClickTrackStock }
                                                name="track_stock"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        }
                                        label="Track inventory"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                {
                    trackStock && (
                        <Grid item>
                            <TrackStock 
                                stockState={ stockState }
                                handleChangeStock={ handleChangeStock }
                                error={ error }
                            />
                        </Grid>
                    )
                }
            </Grid>
            <SaveCancelButtons
                isLoading={ isLoading }
                cancelBtnCallback={ () => history.push(PATH.ITEM) }
                saveBtnCallback={ onSubmitUpdateItem }
            />
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    categoryProp: selectCategory,
    itemProp: selectItem
});

export default connect(mapStateToProps, null)(UpdateItem)