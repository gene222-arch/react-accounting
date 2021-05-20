import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';
import { MenuItem, Typography } from '@material-ui/core';

const HeaderMenuItem = ({ Icon, label = '', handleClick}) => 
{
    return (
        <>
            <MenuItem onClick={ handleClick }>
                <List>
                    <ListItem>
                        <ListItemText primary={ 
                            <Typography variant="h6" color="initial" align='center'>
                                <Icon fontSize='large'/>
                            </Typography>
                        } secondary={ label }/>
                    </ListItem>
                </List>           
            </MenuItem>
        </>
    )
}

export default HeaderMenuItem
