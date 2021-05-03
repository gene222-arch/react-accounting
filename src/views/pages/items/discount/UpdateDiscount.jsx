import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectDiscount } from '../../../../redux/modules/discount/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as DISCOUNT from '../../../../redux/modules/discount/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** API */
import { findAsync } from '../../../../services/items/discount'

/** Material UI Components */
import InputLabel from '@material-ui/core/InputLabel';
import { FormControlLabel, FormControl, FormHelperText } from '@material-ui/core'
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

const UpdateDiscount = ({ alert, discountProp, match }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = match.params;

    const { isLoading, discount, error } = discountProp;

    const [ discountState, setDiscountState ] = useState(discount);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name === 'enabled'
            ? setDiscountState({ ...discountState, enabled: checked })
            : setDiscountState({ ...discountState, [name]: value });
    }

    const onLoadFetchDiscountById = async () => {
        const { data, message, status } = await findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') {
            setDiscountState(data);
        }
    }

    const onSubmitUpdateDiscount = () => dispatch(DISCOUNT.updateDiscount(discountState));

    useEffect(() => {
        onLoadFetchDiscountById();
    }, []);

    return !isLoading && (
        <div>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateDiscount }>
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
                                    value={ discountState.name }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <InputLabel>Hex code</InputLabel>
                                <TextField
                                    fullWidth
                                    name='rate'
                                    error={ Boolean(error.rate) }
                                    helperText={ error.rate }
                                    label='Enter Rate'
                                    value={ discountState.rate }
                                    onChange={ handleChange }
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch 
                                            checked={ Boolean(discountState.enabled) } 
                                            onChange={ handleChange } 
                                            name="enabled" 
                                        />}
                                    label="Enabled"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <SaveCancelButtons 
                            isLoading={ isLoading }
                            cancelBtnCallback={ () => history.push(PATH.DISCOUNT) }
                            saveBtnCallback={ onSubmitUpdateDiscount }
                        />
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    discountProp: selectDiscount
});

export default connect(mapStateToProps, null)(UpdateDiscount)
