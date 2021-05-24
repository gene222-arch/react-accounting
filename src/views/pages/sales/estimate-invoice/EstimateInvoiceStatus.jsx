import React from 'react'
import Button from '@material-ui/core/Button'

const InvoiceStatus = ({ status = 'Draft', text = null }) => 
{
    let backgroundColor = '#FFF';

    switch (status) {
        case 'Cancelled':
            backgroundColor = '#2c2c2c';
            break;

        case 'Draft': 
            backgroundColor = '#90caf9';
            break;

        case 'Invoiced':
            backgroundColor = '#4caf50'
            break;

        case 'Approved':
            backgroundColor = '#4caf50'
            break;

        case 'Refused': 
            backgroundColor = '#B33A3A'

        case 'Sent':
            backgroundColor = '#4caf50'

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

export default InvoiceStatus
