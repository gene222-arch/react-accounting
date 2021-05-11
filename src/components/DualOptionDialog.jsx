import React, { useState } from 'react';

/** Material UI Components */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DualOptionDialog = ({ 
    open = false,
    handleClose,
    dialogTitle = '',
    dialogContent = '',
    successText = 'Agree', 
    cancelText = 'Disagree',
    successCallback
}) => 
{
    
    const handleClickSuccess = () => {
        successCallback();
        handleClose();
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{ dialogTitle }</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">{ dialogContent }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleClose } color="primary">
                    { cancelText }
                </Button>
                <Button onClick={ handleClickSuccess } color="primary">
                    { successText }
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default DualOptionDialog