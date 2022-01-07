// Based on
// Source: Curran Kelleher, 2018 https://www.youtube.com/watch?v=OoZ0LWD9KUs
// Source: https://github.com/viswesh/Maps/tree/master/chapter1
import React, { useState } from 'react';
import { useMapData } from './useMapData';
import { useData } from '../../datatools/useData';
import Marks from './Marks';
import { scaleThreshold } from 'd3'; // scaleSequential
import { schemeBlues } from 'd3-scale-chromatic';
import { Container, Box } from '@mui/material';

const width = 900; // Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = 600; // Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const legendTitle = 'Patents Registered per Year per Million Inhabitants';

const Choropleth = ({ selectedYear }) => {
  const mapData = useMapData();
  const data = useData();

  const [selectedYear, setSelectedYear] = useState(2010);

  if (!mapData || !data) {
    return <p>Loading...</p>;
  }

  console.log('Data was successfully loaded:', data);

  // filter data for selected year
  const filteredData = data.filter((d) => d.year === selectedYear);

  // create mapping table for map data joining
  const rowByCountry = new Map();
  filteredData.forEach((d) => {
    rowByCountry.set(d.country, d);
    console.log(
      `Patent registrations in ${d.country} per Million Inhabitants: ${
        d.patents / (d.population / 1000000)
      }`
    );
  });

  // set colorValue function and colorScale object
  const colorValue = (d) => d.patents / (d.population / 1000000);
  const colorScale = scaleThreshold().domain([10, 50, 100, 500, 1000, 1500]).range(schemeBlues[7]);

  return (
    <Container>
      <Box
        sx={{
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
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
    </Container>
  );
};

export default Choropleth;
