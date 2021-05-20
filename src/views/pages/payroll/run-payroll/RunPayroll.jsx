import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectRunPayroll } from './../../../../redux/modules/run-payroll/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** API */
import { approveAsync } from './../../../../services/payroll/run.payroll';

/** Actions */
import * as RUN_PAYROLL from './../../../../redux/modules/run-payroll/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from './../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from './../../../../components/AlertPopUp';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';
import RunPayrollStatus from './RunPayrollStatus';
import MaterialTable from '../../../../components/MaterialTable'

/** Material UI Icons */
import ApproveIcon from '@material-ui/icons/ThumbUp';

import PATH from './../../../../routes/path';


const runPayrollUseStyles = makeStyles(theme => ({
    iconApproved: {
        color: theme.palette.info.main
    },
    approveIcon: {
        '&:hover': {
            color: theme.palette.info.main
        }
    }
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const RunPayroll = ({ alert, runPayrollProp }) => 
{
    const history = useHistory();
    const classes = runPayrollUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const actions = [
        ({ status }) => ({
            icon: () => (
                <ApproveIcon 
                    className={ clsx({
                        [classes.iconApproved]: status === 'Approved',
                        [classes.approveIcon]: status !== 'Approved'
                    })}
                />
            ),
            tooltip: status !== 'Approved' ? 'Approve Payroll' : 'Payroll Approved',
            onClick: (event, { id }) => dispatch(RUN_PAYROLL.approveRunPayroll({ id })),
            disabled: status === 'Approved'
        })
    ];

    const columns = [
        { field: 'id', hidden: true },
        { field: 'pay_calendar_id', hidden: true },
        { 
            title: 'Name', 
            field: 'name', 
            render: ({ id, pay_calendar_id, name }) => (
                <StyledNavLink 
                    to={ PATH.UPDATE_RUN_PAYROLL.replace(':id', id).replace(':payCalendarId', pay_calendar_id)} 
                    text={ name } 
                />
            )
        },
        { title: 'From date',  field: 'from_date' },
        { title: 'To date',  field: 'to_date' },
        { title: 'Payment date',  field: 'payment_date' },
        { title: 'Employees',  field: 'employees' },
        { title: 'Amount', field: 'amount' },
        {
            title: 'Status', 
            field: 'status',
            render: ({ status }) => <RunPayrollStatus status={ status } />
        }
    ];

    const options = {
        actionsColumnIndex: -1
    };

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => dispatch(RUN_PAYROLL.getRunPayrolls());

    const handleClickDestroy = () => {
        dispatch(RUN_PAYROLL.destroyRunPayrolls({ ids }));
        setIds([]);
    };

    useEffect(() => {
        onLoadFetchAll();
    }, []);

    return (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <MaterialTable
                actions={ actions }
                columns={ columns }      
                data={ runPayrollProp.runPayrolls }  
                isLoading={ runPayrollProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                options={ options }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.PAY_CALENDAR) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    runPayrollProp: selectRunPayroll
});

export default connect(mapStateToProps, null)(RunPayroll)