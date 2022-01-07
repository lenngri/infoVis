import React, { useRef } from 'react';
import { useMapData } from './useMapData';
import { usePatentData } from '../../datatools/usePatentData';
import Marks from './Marks';
import { scaleThreshold } from 'd3'; // scaleSequential
import { schemeBlues } from 'd3-scale-chromatic';
import { Container, Box } from '@mui/material';

const width = 900; // Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = 600; // Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const legendTitle = 'Number of Patents Registered per Year';

const Choropleth = ({ selectedYear }) => {
  const mapData = useMapData();
  const patentData = usePatentData();
  const svg = useRef(null);

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
    </Container>
  );
};

export default Choropleth;
