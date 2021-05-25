import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MaterialTable from '../../../components/MaterialTable'

/** Selectors */
import { selectAccessRight } from '../../../redux/modules/access-right/selector';
import { selectAlert } from '../../../redux/modules/alert/selector';

/** Actions */
import * as ACCESS_RIGHT from '../../../redux/modules/access-right/actions';
import * as ALERT from '../../../redux/modules/alert/actions'

/** Material UI Components */
import Switch from '@material-ui/core/Switch';

/** Material Ui Styles */
import { makeStyles } from '@material-ui/core';

/** Components */
import AddButton from '../../../components/AddButton';
import DeleteButton from '../../../components/DeleteButton';
import AlertPopUp from '../../../components/AlertPopUp';

import PATH from '../../../routes/path';
import StyledNavLink from '../../../components/styled-components/StyledNavLink';


const itemUseStyles = makeStyles(theme => ({
}));


const ActionButton = ({ ids, handleClickDestroy, handleClickRedirect }) => !ids.length 
    ? <AddButton onClickEventCallback={ handleClickRedirect } />
    : <DeleteButton onClickEventCallback={ handleClickDestroy } />


const AccessRight = ({ alert, accessRightProp }) => 
{
    const history = useHistory();
    const classes = itemUseStyles();
    const dispatch = useDispatch();
    
    const [ ids, setIds ] = useState([]);
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Name', 
            field: 'name', 
            render: ({ id, name }) => id === 1 ? name : <StyledNavLink to={ PATH.UPDATE_ACCESS_RIGHT.replace(':id', id)} text={ name } />
        },
        { 
            title: 'Employees', 
            field: 'employees', 
        }
    ];

    const options = {
        selection: true,
        selectionProps: ({ id }) => ({
            disabled: id === 1,
            color: 'primary'
        })
    };

    const onSelectionChange = (rows) => setIds(rows.map(row => row.id));

    const onLoadFetchAll = () => dispatch(ACCESS_RIGHT.getAccessRights());

    const handleClickDestroy = () => {
        dispatch(ACCESS_RIGHT.destroyAccessRights({ ids }));
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
                data={ accessRightProp.accessRights }  
                isLoading={ accessRightProp.isLoading }
                onSelectionChange={ rows => onSelectionChange(rows) }
                options={ options }
                title={ 
                    <ActionButton 
                        classes={ classes } 
                        ids={ ids } 
                        handleClickRedirect = { () => history.push(PATH.CREATE_ACCESS_RIGHT) }
                        handleClickDestroy={ handleClickDestroy }
                    /> }
                onSelectionChange={rows => onSelectionChange(rows)}
            />   
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    accessRightProp: selectAccessRight
});

export default connect(mapStateToProps, null)(AccessRight)