import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectStockAdjustment } from '../../../../redux/modules/stock-adjustment/selector';
import { selectItem } from '../../../../redux/modules/item/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as STOCK_ADJUSTMENT from '../../../../redux/modules/stock-adjustment/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import { Select, FormControl, MenuItem } from '@material-ui/core'
import { Card, CardContent, CardActions } from '@material-ui/core'
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'

/** Material Ui Styles */
import { makeStyles, FormHelperText } from '@material-ui/core';

/** Components */
import SaveCancelButtons from '../../../../components/SaveCancelButtons';
import AlertPopUp from '../../../../components/AlertPopUp';

import PATH from '../../../../routes/path';
import SelectItems from './SelectItems';


const STOCK_ADJUSTMENT_REASONS = [
    'Received items',
    'Loss items',
    'Damaged items',
    'Inventory count'
];


const CreateStockAdjustment = ({ alert, stockAdjustmentProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, stockAdjustment, error } = stockAdjustmentProp;

    const [ stockAdjustmentState, setStockAdjustmentState ] = useState(stockAdjustment);
    const [ items, setItems ] = useState([]);

    const handleChange = (e) => setStockAdjustmentState({ ...stockAdjustmentState, [e.target.name]: e.target.value });

    const onSubmitCreateWarehouse = (e) => dispatch(STOCK_ADJUSTMENT.createStockAdjustment({
        ...stockAdjustmentState,
        adjustment_details: items.map(({ tableData, ...item }) => item)
    }));

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitCreateWarehouse }>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            fullWidth
                                            error={ Boolean(error.stock_adjustment_number) }
                                            helperText={ error.stock_adjustment_number }
                                            name='stock_adjustment_number'
                                            label='Enter Number'
                                            value={ stockAdjustmentState.stock_adjustment_number }
                                            onChange={ handleChange }

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <InputLabel>Reason</InputLabel>
                                        <FormControl 
                                            fullWidth
                                            error={ Boolean(error.reason) }
                                        >
                                            <Select
                                                name='reason'
                                                value={ stockAdjustmentState.reason }
                                                onChange={ handleChange }
                                                fullWidth
                                            >
                                                {
                                                    STOCK_ADJUSTMENT_REASONS.map((reason, index) => (
                                                        <MenuItem key={ index } value={ reason }>{ reason }</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            <FormHelperText>{ error.reason }</FormHelperText>
                                        </FormControl> 
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <SelectItems 
                            reason={ stockAdjustmentState.reason }
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
                                    cancelBtnCallback={ () => history.push(PATH.STOCK_ADJUSTMENT) }
                                    saveBtnCallback={ onSubmitCreateWarehouse }
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
    stockAdjustmentProp: selectStockAdjustment
});

export default connect(mapStateToProps, null)(CreateStockAdjustment)
