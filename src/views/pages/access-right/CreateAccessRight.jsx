import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectAlert } from '../../../redux/modules/alert/selector';
import { selectAccessRight } from './../../../redux/modules/access-right/selector';

/** Actions */
import * as ALERT from '../../../redux/modules/alert/actions'
import * as ACCESS_RIGHT from './../../../redux/modules/access-right/actions';

/** Material UI Components */
import { Card, CardContent, CardActions } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField'

/** Material Ui Styles */
import { makeStyles, Typography, Switch } from '@material-ui/core';

/** Material UI Icon */
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReorderIcon from '@material-ui/icons/Reorder';

/** Components */
import SaveCancelButtons from './../../../components/SaveCancelButtons';
import AlertPopUp from './../../../components/AlertPopUp';

import PATH from './../../../routes/path';


const displayPermissions = (permissions, handleChangePermissions) => 
{
    let elem = [];

    for (const key in permissions) {
        if (permissions[key]) {
            elem.push(
                <Grid item xs={12} sm={6} md={4} lg={4} key={ key }>
                    <Card>
                        <CardContent>
                            <List>
                                <Typography variant='h6' color='initial'>{ key }</Typography>
                                {
                                    permissions[key].map(({ id, name }) => (
                                        <ListItem key={ id }>
                                            <ListItemText primary={
                                                <FormControlLabel
                                                    key={ id }
                                                    control={
                                                        <Checkbox 
                                                            name='permissions'
                                                            icon={ <RadioButtonUncheckedIcon /> } 
                                                            checkedIcon={ <CheckCircleIcon /> } 
                                                            onChange={ handleChangePermissions }
                                                            value={ id }
                                                />}/>
                                            } />
                                            <ListItemSecondaryAction>{ name }</ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            );
        }
    }

    return elem;
}

const CreateAccessRight = ({ alert, accessRightProp }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, accessRight, error } = accessRightProp;

    const [ accessRightsState, setAccessRightsState ] = useState(accessRight);

    const handleChangePermissions = (e, isChecked) => 
    {
        const { name, value } = e.target;

        if (name !== 'permissions') {
            setAccessRightsState({ ...accessRightsState, [name]: value });
        }

        if (name === 'permissions') {
            isChecked 
                ? setAccessRightsState({ ...accessRightsState, permissions: [...accessRightsState.permissions, parseInt(value)] })
                : setAccessRightsState({ ...accessRightsState, permissions: accessRightsState.permissions.filter(id => id !== parseInt(value)) });
        }
    };

    const onLoadFetchPermissions = () => dispatch(ACCESS_RIGHT.getPermissions());

    const onSubmitCreateAccessRight = () => dispatch(ACCESS_RIGHT.createAccessRight(accessRightsState));

    useEffect(() => {
        onLoadFetchPermissions();
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
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <InputLabel id='role'>Role</InputLabel>
                                    <TextField
                                        id='role'
                                        name='role'
                                        error={ Boolean(error.role) }
                                        label='Enter Role Name'
                                        value={ accessRightsState.role }
                                        onChange={ handleChangePermissions }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={ Boolean(accessRightsState.enabled) }
                                                onChange={ handleChangePermissions }
                                                name='enabled'
                                                color='primary'
                                            />
                                        }
                                        label='Enabled'
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={1}>
                    { displayPermissions(accessRightProp.permissions, handleChangePermissions) }
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <SaveCancelButtons
                        isLoading={ isLoading }
                        cancelBtnCallback={ () => history.push(PATH.ACCESS_RIGHT) }
                        saveBtnCallback={ onSubmitCreateAccessRight }
                    />
                </Grid>
            </Grid>
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    accessRightProp: selectAccessRight
});

export default connect(mapStateToProps, null)(CreateAccessRight)