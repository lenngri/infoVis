import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import marks from './marks';
import { useStoreActions } from 'easy-peasy';

const valuetext = (value) => `${value}year`;

export default function TimeSlider() {
  const setSelectedYear = useStoreActions((actions) => actions.setSelectedYear);

  const handleSliderChange = (e, value) => {
    setSelectedYear(value);
  };

  return (
    <Container maxWidth="md">
      <Box sm={{ width: 600, justifyContent: 'center' }} mt={2}>
        <Slider
          aria-label="Year"
          defaultValue={2005}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1996}
          max={2014}
          onChange={handleSliderChange}
        />
      </Box>
    </Container>
  );
}
