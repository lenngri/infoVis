import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 2008,
    label: '2008',
  },
  {
    value: 2009,
    label: '2009',
  },
  {
    value: 2010,
    label: '2010',
  },
  {
    value: 2011,
    label: '2011',
  },
  {
    value: 2012,
    label: '2012',
  },
  {
    value: 2013,
    label: '2013',
  },
  {
    value: 2014,
    label: '2014',
  },
];

const valuetext = (value) => `${value}year`;

export default function TimeSlider({ setYear }) {
  const handleSliderChange = (e, value) => {
    console.log(`Slider value change to ${value}.`);
    setYear(value);
  };

  return (
    <Container maxWidth="sm">
      <Box sm={{ width: 100 }} mt={2}>
        <Slider
          aria-label="Year"
          defaultValue={2011}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={2008}
          max={2014}
          onChangeCommitted={handleSliderChange}
        />
      </Box>
    </Container>
  );
}
