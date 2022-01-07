import React, { useRef, useState } from 'react';
import { useMapData } from './useMapData';
import { usePatentData } from '../../datatools/usePatentData';
import Marks from './Marks';
import { scaleThreshold } from 'd3'; // scaleSequential
import { schemeBlues } from 'd3-scale-chromatic';
import { Container, Box, Slider } from '@mui/material';

const width = 900; // Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = 600; // Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const legendTitle = 'Number of Patents Registered per Year';

const Choropleth = () => {
  const mapData = useMapData();
  const patentData = usePatentData();
  const svg = useRef(null);

  const [selectedYear, setSelectedYear] = useState(2011);

  if (!mapData || !patentData) {
    return <p>Loading...</p>;
  }

  const filteredData = patentData.filter((d) => d.c0 === selectedYear);
  const colorValue = (d) => d.c2;

  const rowByCountry = new Map();
  filteredData.forEach((d) => {
    rowByCountry.set(d.c1, d);
  });

  const colorScale = scaleThreshold()
    .domain([100, 1000, 5000, 10000, 50000, 100000])
    .range(schemeBlues[7]);

  const handleSliderChange = (e, value) => {
    console.log(`Slider value change to ${value}.`);
    setSelectedYear(value);
  };

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

  return (
    <Container>
      <Box
        sx={{
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p className="center">Number of patents registered in {selectedYear}</p>
        <svg width={width} height={height} ref={svg}>
          <Marks
            mapData={mapData}
            width={width}
            height={height}
            rowByCountry={rowByCountry}
            colorScale={colorScale}
            colorValue={colorValue}
            legendTitle={legendTitle}
          />
        </svg>
      </Box>
      <Container maxWidth="sm">
        <Box sm={{ width: 100 }}>
          <Slider
            aria-label="Year"
            defaultValue={2011}
            getAriaValueText={() => 30}
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={2008}
            max={2014}
            onChangeCommitted={handleSliderChange}
          />
        </Box>
      </Container>
    </Container>
  );
};

export default Choropleth;
