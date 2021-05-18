import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card, CardContent, CardActions, CardHeader, IconButton, Typography } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';

const reportItemUseStyles = makeStyles(theme => ({
    navLink: {
        textDecoration: 'none'
    }
}));

const ReportItem = ({ path = '', title = '', description = '', amount }) => 
{
    const classes = reportItemUseStyles();

    return (
        <>
            <NavLink to={ path } className={ classes.navLink }>
                <Card>
                    <CardHeader
                        action={
                            <IconButton aria-label=''>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={ <Typography variant="subtitle1" color='textSecondary'>{ title }</Typography> }
                    />
                    <CardContent>
                        <Typography variant="h5" color="initial">{ amount }</Typography>
                    </CardContent>
                    <CardActions>
                        <Typography variant="subtitle1" color='textPrimary'>{ description }</Typography>
                    </CardActions>
                </Card>
            </NavLink>
        </>
    )
}

export default ReportItem
