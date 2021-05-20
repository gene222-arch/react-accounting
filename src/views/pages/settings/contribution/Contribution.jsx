import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Selectors */
import { selectContribution } from '../../../../redux/modules/contribution/selector';
import { selectAlert } from '../../../../redux/modules/alert/selector';

/** Actions */
import * as CONTRIBUTION from '../../../../redux/modules/contribution/actions';
import * as ALERT from '../../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from '../../../../components/AddButton';
import DeleteButton from '../../../../components/DeleteButton';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';
import AlertPopUp from '../../../../components/AlertPopUp';
import MaterialTable from '../../../../components/MaterialTable'

import PATH from '../../../../routes/path';



const taxUseStyles = makeStyles(theme => ({
}));

const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />

const Contribution = ({ alert, contributionProp }) => 
{
    const history = useHistory();
    const classes = taxUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Name', 
            field: 'name',
            render: row => <StyledNavLink to={ PATH.UPDATE_CONTRIBUTION.replace(':id', row.id) } text={ row.name }/>
        },
        { title: 'Rate', field: 'rate' },
        { 
            title: 'Enabled', 
            field: 'enabled',
            render: row => (
                <Switch
                    checked={ Boolean(row.enabled) }
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            )
        },
    ];

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => {
        if (!contributionProp.contributions.length) {
            dispatch(CONTRIBUTION.getContributions());
        }
    }

    const handleClickDestroy = () => {
        dispatch(CONTRIBUTION.destroyContributions({ ids }));
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
                data={ contributionProp.contributions }  
                isLoading={ contributionProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_CONTRIBUTION) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    contributionProp: selectContribution
});

export default connect(mapStateToProps, null)(Contribution)
