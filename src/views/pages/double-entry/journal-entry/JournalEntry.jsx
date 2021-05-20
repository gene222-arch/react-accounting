import React, { useState, useEffect } from 'react'
import { useHistory, NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import MaterialTable from '../../../../components/MaterialTable'

/** Selectors */
import { createStructuredSelector } from 'reselect';
import { selectJournalEntry } from './../../../../redux/modules/journal-entry/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as JOURNAL_ENTRY from '../../../../redux/modules/journal-entry/actions'
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Components */
import AddButton from './../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import AlertPopUp from './../../../../components/AlertPopUp';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';

import PATH from './../../../../routes/path';

/** Material Ui Styles */
import { makeStyles, Typography } from '@material-ui/core';




const journalEntryUseStyles = makeStyles(theme => ({
}));

const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />

const JournalEntry = ({ alert, journalEntryProp }) => 
{
    const classes = journalEntryUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ ids, setIds ] = useState([]);

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Date', 
            field: 'date',
            render: ({ id, date }) => <StyledNavLink to={ PATH.UPDATE_JOURNAL_ENTRY.replace(':id', id) } text={ date } />
        },
        { title: 'Amount', field: 'amount' },
        { title: 'Reference', field: 'reference' },
        { title: 'Description', field: 'description' }
    ];

    const onSelectionChange = (rows) => setIds(rows.map(({ id }) => id));

    const onLoadFetchAll = () => {
        if (!journalEntryProp.journalEntries.length) {
            dispatch(JOURNAL_ENTRY.getJournalEntries());
        }
    }

    const handleClickDestroy = () => {
        dispatch(JOURNAL_ENTRY.destroyJournalEntries({ ids }));
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
                columns={ columns }      
                data={ journalEntryProp.journalEntries }  
                isLoading={ journalEntryProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_JOURNAL_ENTRY) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    journalEntryProp: selectJournalEntry
});

export default connect(mapStateToProps, null)(JournalEntry)
