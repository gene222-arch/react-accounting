import React, { useState } from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers';
import { format } from 'date-fns'

/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/** Material UI Icons */
import UpdateIcon from '@material-ui/icons/Update';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import MoreVertIcon from '@material-ui/icons/MoreVert';

/** Material UI Styles */
import { makeStyles } from '@material-ui/core/styles';



const DEDashboardHeaderUseStyles = makeStyles(theme => ({
    menuItem: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    menuItemIcons: {
        flexShrink: 1
    }
}));


const Header = ({ dateFrom, dateTo, handleChangeDateFrom, handleChangeDateTo, handleClickUpdateDashboard, handleClickResetDashboard }) => 
{
    const classes = DEDashboardHeaderUseStyles();

    const [optionMenu, setOptionMenu] = useState(null);

    const handleClickOptionMenu = (e) => !optionMenu ? setOptionMenu(e.currentTarget) : setOptionMenu(null);

    return (
        <>
            <Grid container spacing={1} justify='space-between' alignItems='center'>
                <Grid item>
                    <Typography variant="h4" color="initial">Dashboard</Typography> 
                </Grid>
                <Grid item>
                    <Grid container spacing={1} alignItems='center'>
                        <Grid item>
                            <KeyboardDatePicker
                                label='from'
                                name='dateFrom'
                                variant='inline'
                                format='yyyy-MM-dd'
                                margin='normal'
                                maxDate={ dateTo }
                                value={ dateFrom }
                                onChange={ handleChangeDateFrom }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                label='to'
                                name='dateTo'
                                variant='inline'
                                format='yyyy-MM-dd'
                                margin='normal'
                                minDate={ dateFrom }
                                value={ dateTo }
                                onChange={ handleChangeDateTo }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="text" color="default" onClick={ handleClickOptionMenu }>
                                <MoreVertIcon />
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={ optionMenu }
                                keepMounted
                                open={ Boolean(optionMenu) }
                                onClose={ handleClickOptionMenu }
                            >
                                <MenuItem onClick={ handleClickOptionMenu } className={classes.menuItem}>
                                    <UpdateIcon onClick={ handleClickUpdateDashboard } className={ classes.menuItemIcons }/>
                                    <Typography variant="subtitle2" color="initial">Update</Typography>
                                </MenuItem>
                                <MenuItem onClick={ handleClickOptionMenu } className={classes.menuItem}>
                                    <RotateLeftIcon onClick={ handleClickResetDashboard } className={ classes.menuItemIcons }/>
                                    <Typography variant="subtitle2" color="initial">Reset</Typography>
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Header
