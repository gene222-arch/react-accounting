/** Libraries */
import React from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch, connect } from 'react-redux';

/** Components */
import AlertPopUp from './../../../components/AlertPopUp';

/** Actions */
import * as ALERT from '../../../redux/modules/alert/actions';
import { resendEmailVerification } from '../../../redux/modules/auth/actions';

/** Selector */
import { createStructuredSelector } from 'reselect';
import { selectAlert } from '../../../redux/modules/alert/selector';


const EmailVerification = ({ alert }) => 
{
    const dispatch = useDispatch();

    const handleClickResendEmailVerification = () => dispatch(resendEmailVerification());

    return (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <Button 
                variant="contained" 
                color="default"
                onClick={handleClickResendEmailVerification}
            >
                Resend email verification
            </Button>
        </>
    )
}

const mapStateToProps = (state) => createStructuredSelector({
    alert: selectAlert
});


export default connect(mapStateToProps, null)(EmailVerification);
