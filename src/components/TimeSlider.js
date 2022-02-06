import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Stack } from '@mui/material';

import marks from './marks';
import { useStoreActions } from 'easy-peasy';

const valuetext = (value) => `${value}year`;

// Source for useInterval:
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/ (06.02.2022)
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function TimeSlider() {
  const setSelectedYear = useStoreActions((actions) => actions.setSelectedYear);
  const [counter, setCounter] = useState(1996);
  const [autoplayFlag, setAutoplayFlag] = useState(false);
  const delay = 750;

  useInterval(() => {
    if (autoplayFlag && counter < 2015) {
      setCounter(counter + 1);
      setSelectedYear(counter);
      if (counter === 2014) {
        setCounter(1996);
        setAutoplayFlag(false);
      }
    }
  }, delay);

  const handleSliderChange = (e, value) => {
    setSelectedYear(value);
  };

  return (
    <Container maxWidth="lg">
      <Box sm={{ width: 600, justifyContent: 'center' }} mt={2}>
        <Stack direction="row" spacing={4}>
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
            disabled={autoplayFlag ? true : false}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={autoplayFlag ? true : false}
                  onClick={() => setAutoplayFlag(!autoplayFlag)}
                  size="medium"
                />
              }
              label="Autoplay"
            />
          </FormGroup>
        </Stack>
      </Box>
    </Container>
  );
}
