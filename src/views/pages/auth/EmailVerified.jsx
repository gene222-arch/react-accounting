import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { useDispatch, connect } from 'react-redux';

/** Actions */
import { verifyEmail } from '../../../redux/modules/auth/actions';

/** Material UI Components */
import Grid from '@material-ui/core/Grid'

/** Utils */
import * as QueryParam from '../../../utils/queryParams'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../redux/modules/auth/selector';


const EmailVerified = ({ auth }) => 
{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verifyEmail({
            id: QueryParam.get('id'),
            hash: QueryParam.get('hash'),
            expires: QueryParam.get('expires'),
            signature: QueryParam.get('signature')
        }));
    }, []);

    return (
        <>
            <Grid container spacing={1} justify='center' alignItems='center'>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" color="initial" align='center'>
                        Email verified successfully.
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProps = () => createStructuredSelector({
    auth: selectAuth
})

export default connect(mapStateToProps, null)(EmailVerified);
