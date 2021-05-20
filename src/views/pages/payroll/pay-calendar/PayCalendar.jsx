import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { selectPayCalendar } from './../../../../redux/modules/pay-calendar/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as PAY_CALENDAR from './../../../../redux/modules/pay-calendar/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Material UI Icons */
import DateRangeIcon from '@material-ui/icons/DateRange';

/** Components */
import AddButton from './../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from './../../../../components/AlertPopUp';

import PATH from './../../../../routes/path';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';


const itemUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const PayCalendar = ({ alert, payCalendarProp }) => 
{
    const history = useHistory();
    const classes = itemUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const actions = [
        ({ payroll_id }) => ({
            icon: () => (
                <DateRangeIcon 
                    className={ clsx({
                        [classes.iconApproved]: Boolean(payroll_id),
                        [classes.approveIcon]: Boolean(payroll_id)
                    })}
                />
            ),
            tooltip: !payroll_id ? 'Run Payroll' : 'Payroll done',
            onClick: (event, { id }) => history.push(PATH.CREATE_RUN_PAYROLL.replace(':payCalendarId', id)),
            disabled: Boolean(payroll_id)
        })
    ];

    const columns = [
        { field: 'id', hidden: true },
        { field: 'payroll_id', hidden: true },
        { 
            title: 'Name', 
            field: 'name', 
            render: ({ id, name }) => <StyledNavLink to={ PATH.UPDATE_PAY_CALENDAR.replace(':id', id)} text={ name } />
        },
        { title: 'Type',  field: 'type' },
        { title: 'Pay day mode', field: 'pay_day_mode' },
    ];

    const options = {
        selection: false,
        search: false,
        actionsColumnIndex: -1
    };

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => {
        if (!payCalendarProp.payCalendars.length) {
            dispatch(PAY_CALENDAR.getPayCalendars());
        }
    }

    const handleClickDestroy = () => {
        dispatch(PAY_CALENDAR.destroyPayCalendars({ ids }));
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
                data={ payCalendarProp.payCalendars }  
                isLoading={ payCalendarProp.isLoading }
                options={ options }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_PAY_CALENDAR) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    payCalendarProp: selectPayCalendar
});

export default connect(mapStateToProps, null)(PayCalendar)