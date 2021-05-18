import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MaterialTable from './../../../../components/MaterialTable';

const BenefitsAndDeduction = ({ 
    contributions, 
    salaryBenefits, 
    taxes, 
    contributionsState, 
    setContributionsState, 
    salaryBenefitsState, 
    setSalaryBenefitsState, 
    taxesState, 
    setTaxesState }) => 
{
    const benefitsColumns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Type', 
            field: 'type',
            lookup: salaryBenefits.reduce((salaryBenefit, { id, type, amount }) => ({ ...salaryBenefit, [id]: `${ type } - ${ amount }` }), {})
        },
        { title: 'Amount', field: 'amount', type: 'numeric', editable: 'never' },
    ];

    const taxesColumns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Type', 
            field: 'name',
            lookup: taxes.reduce((tax, { id, name, rate }) => ({...tax, [id]: `${ name } - %${ rate }` }), {})
        },
        { title: 'Rate', field: 'rate', type: 'numeric', editable: 'never' },
    ];

    const contributionsColumns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Name', 
            field: 'name',
            lookup: contributions.reduce((contribution, { id, name, rate }) => ({ ...contribution, [id]: `${ name } - %${ rate }` }), {})
        },
        { title: 'Rate', field: 'rate', type: 'numeric', editable: 'never' }
    ];
    
    const options = {
        search: false,
        selection: false
    };

    const handleOnRowAddBenefits = (newData) => (
        new Promise((resolve, reject) => {
            setTimeout(() => {

                const { id, amount } = salaryBenefits.find(({ id }) => id === parseInt(newData.type));

                newData = {
                    ...newData,
                    id,
                    amount
                };

                setSalaryBenefitsState([...salaryBenefitsState, newData]);

                resolve();
            }, 100)
        })
    );

    const handleOnRowDeleteBenefits = ({ tableData }) => (
        new Promise((resolve, reject) => {
            setTimeout(() => 
            {
                const benefitsDelete = [...salaryBenefitsState];
                const { id } = tableData;

                benefitsDelete.splice(id, 1);
                setSalaryBenefitsState([...benefitsDelete]);
                
                resolve();
            }, 100)
        })
    );

    const handleOnRowAddTaxes = (newData) => (
        new Promise((resolve, reject) => 
        {
            setTimeout(() => 
            {
                const { id, rate } = taxes.find(({ id }) => id === parseInt(newData.name));

                newData = {
                    ...newData,
                    id,
                    rate
                };
            
                setTaxesState([...taxesState, newData]);
                
                resolve();
            }, 100)
        })
    );

    const handleOnRowDeleteTaxes = ({ tableData }) => (
        new Promise((resolve, reject) => 
        {
            setTimeout(() => {
                const taxesDelete = [...taxesState];
                const { id } = tableData;

                taxesDelete.splice(id, 1);
                setTaxesState([...taxesDelete]);
                
                resolve()
            }, 100)
        })
    );

    const handleOnRowAddContributions = (newData) => (
        new Promise((resolve, reject) => 
        {
            setTimeout(() => {

                const { id, rate } = contributions.find(({ id }) => id === parseInt(newData.name));

                newData = {
                    ...newData,
                    id,
                    rate
                };

                setContributionsState([...contributionsState, newData]);
                
                resolve();
            }, 100)
        })
    );

    const handleOnRowDeleteContributions = ({ tableData }) => (
        new Promise((resolve, reject) => {
            setTimeout(() => {
                const contributionsDelete = [...contributionsState];
                const { id } = tableData;

                contributionsDelete.splice(id, 1);
                setContributionsState([...contributionsDelete]);
                
                resolve()
            }, 100)
        })
    );


    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant='h5' color='initial' align='center'>Benefits</Typography>
                <MaterialTable
                    title='Benefits'
                    columns={ benefitsColumns }
                    data={ salaryBenefitsState }
                    editable={{
                        onRowAdd: newData => handleOnRowAddBenefits(newData),
                        onRowDelete: handleOnRowDeleteBenefits
                    }}
                    options={ options }
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant='h5' color='initial' align='center'>Deductions</Typography>
                <MaterialTable
                    title='Taxes'
                    columns={ taxesColumns }
                    data={ taxesState }
                    editable={{
                        onRowAdd: handleOnRowAddTaxes,
                        onRowDelete: handleOnRowDeleteTaxes
                    }}
                    options={ options }
                />
            </Grid>  
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <MaterialTable
                    title='Contributions'
                    columns={ contributionsColumns }
                    data={ contributionsState }
                    editable={{
                        onRowAdd: handleOnRowAddContributions,
                        onRowDelete: handleOnRowDeleteContributions
                    }}
                    options={ options }
                />
            </Grid>            
        </Grid>
    )
}

export default BenefitsAndDeduction