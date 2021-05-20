import React from 'react'

import { Card, CardContent, Grid, Avatar, CardHeader } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const PayrollCard = ({ title = '', cardTitle = '', subheader= '', Icon }) => {
    return (
        <>
            <Card>
                <CardHeader
                    action={
                        <Avatar>
                            <Icon />
                        </Avatar>
                    }
                    title={ cardTitle }
                    subheader={ subheader }
                    titleTypographyProps={{ 
                        variant: 'subtitle2'
                    }}
                    subheaderTypographyProps={{ 
                        variant: 'h4'
                    }}
                />
                <CardContent>
                    <Grid container spacing={1} justify='space-between' alignItems='center'>
                        <Grid item>
                            <Typography variant="subtitle2" color="initial">{ title }</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default PayrollCard
