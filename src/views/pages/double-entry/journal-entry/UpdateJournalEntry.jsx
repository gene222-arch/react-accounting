import React,{ useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { format } from 'date-fns'
import MaterialTable from '../../../../components/MaterialTable'

/** API */
import * as JOURNAL_ENTRY_API from '../../../../services/double-entry/journal.entry'

/** Actions */
import * as CHART_OF_ACCOUNT from '../../../../redux/modules/chart-of-account/actions'
import * as JOURNAL_ENTRY from '../../../../redux/modules/journal-entry/actions'
import * as ALERT from './../../../../redux/modules/alert/actions';

/** Selectors */
import { createStructuredSelector } from 'reselect';
import { selectAlert } from '../../../../redux/modules/alert/selector';
import { selectChartOfAccount } from './../../../../redux/modules/chart-of-account/selector';
import { selectJournalEntry } from './../../../../redux/modules/journal-entry/selector';

/** Material UI Components */
import { Card, CardContent, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';

/** Components */
import AlertPopUp from './../../../../components/AlertPopUp';
import SaveCancelButtons from './../../../../components/SaveCancelButtons';

import PATH from './../../../../routes/path';


const UpdateJournalEntry = ({ alert, chartOfAccountProp, journalEntryProp, match }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();
    
    const { id } = match.params;
    const { isLoading, journalEntry, error } = journalEntryProp;

    const [ journalEntryState, setJournalEntryState ] = useState(journalEntry);
    const [ journalEntryDetails, setJournalEntryDetails ] = useState([]);

    const columns = [
        { 
            title: 'COA', 
            field: 'chart_of_account_id',
            validate: row => !row.chart_of_account_id ? 'COA field is required' : '',
            lookup: chartOfAccountProp.chartOfAccounts.reduce((accu, chartOfAccount) => ({ ...accu, [chartOfAccount.id]: chartOfAccount.name }), {})
        },
        { 
            title: 'Debit', 
            field: 'debit', 
            type: 'numeric',
            validate: row => isNaN(row.debit) ? 'Please enter a valid numeric value' : '',
            render: row => !Number.isInteger(row.debit) ? row.debit : row.debit?.toFixed(2) ?? (0).toFixed(2)
        },
        { 
            title: 'Credit', 
            field: 'credit', 
            type: 'numeric',
            validate: row => isNaN(row.credit) ? 'Please enter a valid numeric value' : '',
            render: row => !Number.isInteger(row.credit) ? row.credit :row.credit?.toFixed(2) ?? (0).toFixed(2) 
        }
    ];

    const options = {
        selection: false,
        search: false
    };

    const editable = {
        onRowAdd: newData => handleClickAddRow(newData),
        onRowUpdate: (newData, oldData) => handleClickEditRow(newData, oldData),
        onRowDelete: oldData => handleClickDeleteRow(oldData),
    };
    
    const handleClickAddRow = data => (
        new Promise((resolve, reject) => {
            setTimeout(() => {
                setJournalEntryDetails([...journalEntryDetails, data]);
                
                resolve();
            }, 100)
        })
    );

    const handleClickEditRow = (newData, oldData) => (
        new Promise((resolve, reject) => {
            setTimeout(() => {
                const journalEntryDetails_ = [...journalEntryDetails];
                const { id } = oldData.tableData;

                journalEntryDetails_[id] = newData;

                setJournalEntryDetails([...journalEntryDetails_]);
                resolve();
            }, 100)
        })
    );

    const handleClickDeleteRow = oldData => (
        new Promise((resolve, reject) => {
            setTimeout(() => {
                const journalEntryDetails_ = [...journalEntryDetails];
                const { id } = oldData.tableData;

                journalEntryDetails_.splice(id, 1);

                setJournalEntryDetails([...journalEntryDetails_]);
                resolve()
            }, 100)
        })
    );

    const handleChangeDate = (date) => setJournalEntryState({ ...journalEntryState, date: format(date, 'yyyy-MM-dd') });

    const handleChangeJournalEntry = (e) => setJournalEntryState({ ...journalEntryState, [e.target.name]: e.target.value })

    const onLoadFetchAllChartOfAccounts = () => dispatch(CHART_OF_ACCOUNT.getChartOfAccounts());

    const onLoadFetchJournalEntry = async () => 
    {
        const { data, status } = await JOURNAL_ENTRY_API.findAsync({ id });

        if (status !== 'success') {

        }

        if (status === 'success') {

            const { id, date, reference, description, details } = data;

            setJournalEntryState({id, date, reference, description});
            setJournalEntryDetails(details.map(detail => detail.pivot));
        }
    }

    const onSubmitUpdateJournalEntry = () => {
        
        if (!journalEntryDetails.length) {
            dispatch(ALERT.showAlert({
                status: 'error',
                message: 'The journal entries is required. Please add at least 1 entry.'
            }));
        }
        else {
            dispatch(JOURNAL_ENTRY.updateJournalEntry({
                ...journalEntryState,
                details: journalEntryDetails.map(({ chart_of_account_id, debit, credit }) => ({ chart_of_account_id, debit, credit }))
            }));
        }
    }

    useEffect(() => {
        onLoadFetchJournalEntry();
        onLoadFetchAllChartOfAccounts();
    }, []);

    return !chartOfAccountProp.isLoading && (
        <>
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <form onSubmit={ onSubmitUpdateJournalEntry }>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4} md={3} lg={3}>
                                        <InputLabel>Date</InputLabel>
                                        <KeyboardDatePicker
                                            error={ Boolean(error.date) }
                                            helperText={ error.date }
                                            disableToolbar
                                            name='date'
                                            variant='inline'
                                            format='yyyy-MM-dd'
                                            margin='normal'
                                            value={ journalEntryState.date }
                                            onChange={ handleChangeDate }
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9} lg={9}>
                                        <InputLabel>Reference</InputLabel>
                                        <TextField
                                            error={ Boolean(error.reference) }
                                            helperText={ error.reference }
                                            fullWidth
                                            name='reference'    
                                            label='Reference'
                                            value={ journalEntryState.reference }
                                            onChange={ handleChangeJournalEntry }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <InputLabel>Description</InputLabel>
                                        <TextField
                                            error={ Boolean(error.description) }
                                            helperText={ error.description }
                                            fullWidth
                                            name='description'    
                                            label='Description'
                                            value={ journalEntryState.description }
                                            onChange={ handleChangeJournalEntry }
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MaterialTable
                            columns={ columns }      
                            data={ journalEntryDetails }  
                            options={ options }
                            editable={ editable }
                            title='Journal Entries'
                        />   
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <SaveCancelButtons
                            isLoading={ isLoading }
                            cancelBtnCallback= { () => history.push(PATH.JOURNAL_ENTRY) }
                            saveBtnCallback={ onSubmitUpdateJournalEntry }
                        />
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    chartOfAccountProp: selectChartOfAccount,
    journalEntryProp: selectJournalEntry
});

export default connect(mapStateToProps, null)(UpdateJournalEntry);
