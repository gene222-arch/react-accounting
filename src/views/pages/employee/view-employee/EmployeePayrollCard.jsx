import React from 'react'

import Divider from '@material-ui/core/Divider'
import { Card, CardContent, Typography } from '@material-ui/core'

const EmployeePayrollCard = ({ title = '', amount = 0 }) => 
{
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="subtitle1" color="initial">{ title }</Typography>
                    <Divider />
                    <Typography variant="h6" color="initial">{ amount }</Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default EmployeePayrollCard
