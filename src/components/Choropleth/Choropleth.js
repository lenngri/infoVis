import React, { useState } from 'react';
import { useMapData } from './useMapData';
import { usePatentData } from '../../datatools/usePatentData';
import { usePopulationData } from '../../datatools/usePopulationData';
import Marks from './Marks';
import { scaleThreshold } from 'd3'; // scaleSequential
import { schemeBlues } from 'd3-scale-chromatic';
import { Container, Box, Slider } from '@mui/material';

const width = 900; // Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = 600; // Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const legendTitle = 'Number of Patents Registered per Year';

const Colorpleth = () => {
  const mapData = useMapData();
  const patentData = usePatentData();
  const populationData = usePopulationData();

  const [selectedYear, setSelectedYear] = useState(2010);

  if (!mapData || !patentData || !populationData) {
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
        <svg width={width} height={height}>
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
      <Slider
        aria-label="Year"
        defaultValue={2010}
        getAriaValueText={() => 30}
        valueLabelDisplay="auto"
        marks
        min={2008}
        max={2014}
        onChangeCommitted={handleSliderChange}
      />
    </Container>
  );
};

export default Colorpleth;
