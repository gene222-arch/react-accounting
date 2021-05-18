import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const STEPS = [
    'Employees', 
    'Benefits and Deductions', 
    'PaySlips',
    'Approval'
];

const RunPayrollProgress = ({ children, activeStep, handleNext, handleBack, handleReset, actionOnSubmit, stepHasError, isLoading }) => 
{
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Stepper activeStep={ activeStep } alternativeLabel>
                {
                    STEPS.map(label => (
                        <Step key={ label }>
                            <StepLabel>
                                <Typography variant="h6" color={
                                    stepHasError[label] === label && stepHasError.hasError 
                                        ? 'error'
                                        : 'initial'
                                }>{ label }</Typography>
                            </StepLabel>
                        </Step>
                    )
                )}
            </Stepper>
            <div>
                { children }
            </div>
            <div>
                <Grid container spacing={1} justify='flex-end'>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {
                            activeStep === STEPS.length ? 
                            (
                                <div>
                                    <Typography className={ classes.instructions }>All steps completed</Typography>
                                    <Button onClick={ handleReset }>Reset</Button>
                                </div>
                            ) : 
                            (
                                <>
                                    <Button
                                        disabled={ !activeStep }
                                        onClick={ handleBack }
                                        className={ classes.backButton }
                                    >
                                        Back
                                    </Button>
                                    
                                    {
                                        activeStep !== STEPS.length - 1 && (
                                            <Button variant='contained' color='primary' onClick={ handleNext }>
                                                Next
                                            </Button>
                                        )
                                    }
                                    {
                                        activeStep === STEPS.length - 1 &&  (
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <Button 
                                                        variant='contained' 
                                                        color='primary' 
                                                        onClick={ e => actionOnSubmit() }
                                                        disabled={ isLoading }
                                                    >
                                                        Save 
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button 
                                                        variant='contained' 
                                                        color='primary' 
                                                        onClick={ e => actionOnSubmit('Approved') }
                                                        disabled={ isLoading }
                                                    >
                                                        Approve 
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        )
                                            
                                    }
                                </>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default RunPayrollProgress