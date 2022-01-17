import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import marks from './marks';

const valuetext = (value) => `${value}year`;

export default function TimeSlider({ setYear }) {
  const handleSliderChange = (e, value) => {
    console.log(`Slider value change to ${value}.`);
    setYear(value);
  };

  return (
    <Container maxWidth="md">
      <Box sm={{ width: 600 }} mt={2}>
        <Slider
          aria-label="Year"
          defaultValue={1996}
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
