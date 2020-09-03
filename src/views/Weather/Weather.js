import React from "react";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

export const Weather = () => {
    return (
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={4} color="secondary">
          <WbSunnyIcon />
        </StyledBadge>
      </IconButton>
    );
};
