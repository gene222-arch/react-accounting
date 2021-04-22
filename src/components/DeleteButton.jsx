import React from 'react'

/** Material UI Components */
import Button from '@material-ui/core/Button'

/** Material UI Icons */
import DeleteIcon from '@material-ui/icons/Delete';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';



const deleteButtonUseStyles = makeStyles(theme => ({
    deleteBtn: {
        '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.error.main,
        }
    }
}));

const DeleteButton = ({ color = 'default', variant = 'text', onClickEventCallback }) => 
{
    const classes = deleteButtonUseStyles(); 

    return <Button 
        variant={ variant } 
        color={ color } 
        className={ classes.deleteBtn }
        onClick={ onClickEventCallback }
    > <DeleteIcon /> </Button>
}

export default DeleteButton
