import React from 'react'

/** Material UI Components */
import Button from '@material-ui/core/Button'

/** Material UI Icons */
import AddIcon from '@material-ui/icons/Add';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';


const addButtonUseStyles = makeStyles(theme => ({
    addBtn: {
        color: '#FFF',
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: green[300],
        }
    }
}));

const AddButton = ({ actionName = null, color = 'default', variant = 'contained', onClickEventCallback }) => 
{
    const classes = addButtonUseStyles(); 

    return <Button 
        variant={ variant } 
        color={ color } 
        className={ classes.addBtn }
        onClick={ onClickEventCallback }
    > { actionName ?? <AddIcon /> } </Button>
}

export default AddButton
