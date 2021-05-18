import React from 'react'
import Button from '@material-ui/core/Button'

const RunPayrollStatus = ({ status = 'Unapproved', text = null }) => 
{
    let backgroundColor = '#FFF';

    switch (status) {
        case 'Approved':
            backgroundColor = '#4caf50';
            break;

        case 'Unapproved': 
            backgroundColor = '#2c2c2c';
            break;
    }

    return <Button 
        size='small'
        variant='contained' 
        color='default'
        style={{ 
            color: '#FFF',
            backgroundColor
        }}
        disabled
    >
        { text ?? status }
    </Button>
}

export default RunPayrollStatus
