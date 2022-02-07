import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

export default function Tooltips({ content }) {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={content}
            arrow
          >
            <IconButton onClick={handleTooltipOpen}>
              {' '}
              <InfoIcon />{' '}
            </IconButton>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
}
