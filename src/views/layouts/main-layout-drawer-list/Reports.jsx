import React, { useState, useEffect } from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import StyledNavLink from './../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';

const REPORTS = [
    'View Income Summary',
    'View Income vs Expense Summary',
    'View Profit and Loss',
    'View Tax Summary',
    'View General Ledger',
    'View Balance Sheet',
    'View Trial Balance'
];

const Reports = ({ reports, selectReports, authUserPermissions }) => 
{

    const [ canViewReports, setCanViewReports ] = useState(false);

    const userCanViewReports = () => 
    {
        REPORTS.forEach(report => {
            if (authUserPermissions.includes(report)) {
                setCanViewReports(true);
            }
        });
    }

    useEffect(() => {
        userCanViewReports();
    }, []);
    
    if (!canViewReports) {
        return '';
    }

    return (
       <>
            <StyledNavLink to={ PATH.REPORTS } text={
                <ListItem button selected={ reports } onClick={ selectReports }>
                    <ListItemIcon>
                        <EqualizerIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary={'Reports'} />
                </ListItem>
            } />
       </>
    )
}

export default Reports
