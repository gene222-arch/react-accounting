import { Icon, IconButton, Tooltip } from '@material-ui/core';

import React from 'react'

const ActionButton = ({ action, handleOnClick }) => (
    <span>
        <IconButton
            color="inherit"
            disabled={action.disabled}
            disableRipple
            onClick={(event) => handleOnClick(event)}
            style={{
                backgroundColor:'transparent'
            }}
        >
            {typeof action.icon === "string" ? (
                <Icon {...action.iconProps} fontSize="small">{action.icon}</Icon>
                ) : (
                    <action.icon
                        {...action.iconProps}
                        disabled={action.disabled}                
                    />
                )
            }
        </IconButton>
    </span>
)

const MaterialTableAction = (props) => 
{
    const action = props.action;
    const data = props.data;

    if (typeof action === 'function') 
    {
        action = action(props.data);

        if (!action) {
            return null;
        }
    }

    const handleOnClick = event => {
        if (action.onClick) {
            action.onClick(event, data);
            event.stopPropagation();
        }
    };

    if (action.tooltip) {
        return (
            <Tooltip title={action.tooltip}>
                <ActionButton action={ action } handleOnClick={ handleOnClick } />
            </Tooltip>
        );
    } 

    return <ActionButton action={ action } handleOnClick={ handleOnClick } />;
}

export default MaterialTableAction
