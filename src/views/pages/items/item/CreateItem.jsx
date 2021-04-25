import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectItem } from './../../../../redux/modules/item/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as ITEM from './../../../../redux/modules/item/actions';
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

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import SaveCancelButtons from './../../../../components/SaveCancelButtons';
import AlertPopUp from './../../../../components/AlertPopUp';

import PATH from './../../../../routes/path';
import TrackStock from './TrackStock';

const CreateItem = ({ alert, itemProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, item, error } = itemProp;

    const [ itemState, setItemState ] = useState(item.item);
    const [ stockState, setStockState ] = useState(item.stock);
    const [ taxes, setTaxes ] = useState(item.taxes);
    const [ trackStock, setTrackStock ] = useState(item.trackStock);

    const handleClickTrackStock = () => setTrackStock(!trackStock);

    const handleChangeItem = (e) => {
        const { name, value, checked } = e.target;

        name === 'is_for_sale'
            ? setItemState({ ...itemState, is_for_sale: checked })
            : setItemState({ ...itemState, [name]: value });
    }

    const handleChangeStock = (e) => setStockState({ ...stockState, [e.target.name]: e.target.value });

    const onSubmitCreateItem = () => dispatch(ITEM.createItem(itemState));

    useEffect(() => {
        
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        fullWidth
                                        name='name'
                                        label="Enter Name"
                                        value={ itemState.name }
                                        onChange={ handleChangeItem }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.taxes) } fullWidth>
                                        <InputLabel>Tax</InputLabel>
                                        <Select
                                            value={ error.taxes }
                                            onChange={ handleChangeItem }
                                            inputProps={{
                                                name: 'taxes'
                                            }}
                                            fullWidth
                                        >
                                            
                                        </Select>
                                        <FormHelperText>{ error.taxes || '' }</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        fullWidth
                                        name='description'
                                        label="Enter Description"
                                        value={ itemState.description }
                                        onChange={ handleChangeItem }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        fullWidth
                                        name='price'
                                        label="Enter Sale Price"
                                        value={ itemState.price }
                                        onChange={ handleChangeItem }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        fullWidth
                                        name='cost'
                                        label="Enter Purchase Price"
                                        value={ itemState.cost }
                                        onChange={ handleChangeItem }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl error={ Boolean(error.category) } fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={ error.category }
                                            onChange={ handleChangeItem }
                                            inputProps={{
                                                name: 'category'
                                            }}
                                            fullWidth
                                        >
                                            
                                        </Select>
                                        <FormHelperText>{ error.category || '' }</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
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
                                stock={ stockState }
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
                saveBtnCallback={ onSubmitCreateItem }
            />
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    itemProp: selectItem
});

export default connect(mapStateToProps, null)(CreateItem)