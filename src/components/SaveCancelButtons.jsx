import React from 'react'

/** Material UI Components */
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

const saveCancelButtonsUseStyles = makeStyles(theme => ({
    cancelBtn: {
        backgroundColor: theme.palette.error.main,
        color: '#FFF',
        '&:hover': {
            backgroundColor: red[300]
        }
    },
    saveBtn: {
        backgroundColor: theme.palette.success.main,
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[300]
        }
    }
}));

const SaveCancelButtons = ({ isLoading = false, cancelBtnCallback, saveBtnCallback }) => 
{
    const classes = saveCancelButtonsUseStyles();

    return (
        <>
            <Grid container spacing={1}>
                <Grid item>
                    <Button 
                        variant="contained" 
                        color="default"
                        onClick={ cancelBtnCallback }
                        className={ classes.cancelBtn }
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="contained" 
                        color="default" 
                        onClick={ saveBtnCallback }
                        disabled={ isLoading }
                        className={ classes.saveBtn }
                    >
                        { !isLoading ? 'Save' : 'Saving' }
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default SaveCancelButtons
