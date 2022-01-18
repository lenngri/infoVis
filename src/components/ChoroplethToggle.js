import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function ChoroplethToggle() {
  const view = useStoreState((state) => state.view);
  const changeView = useStoreActions((actions) => actions.changeView);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    changeView(newValue);
  };

  return (
    <ToggleButtonGroup color="primary" value={view} exclusive onChange={handleChange}>
      <ToggleButton value="patents">Number of Patents</ToggleButton>
      <ToggleButton value="investments">R&D Expenditure of GDP</ToggleButton>
    </ToggleButtonGroup>
  );
}
