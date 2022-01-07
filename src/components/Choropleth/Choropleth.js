// Based on
// Source: Curran Kelleher, 2018 https://www.youtube.com/watch?v=OoZ0LWD9KUs
// Source: https://github.com/viswesh/Maps/tree/master/chapter1
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
const legendTitle = 'Patents Registered per Year per Million Inhabitants';

const Colorpleth = () => {
  const mapData = useMapData();
  const patentData = usePatentData();
  const populationData = usePopulationData();

  const [selectedYear, setSelectedYear] = useState(2010);

  if (!mapData || !patentData || !populationData) {
    return <p>Loading...</p>;
  }

  // filter Data Sets for selected year
  const filteredPatentData = patentData.filter((d) => d.year === selectedYear);
  const filteredPopulationData = populationData.filter((d) => d.year === selectedYear);

  // create mapping between country name and population size
  let populationByCountry = {};
  filteredPopulationData.forEach((d) => {
    populationByCountry[d.country] = {
      year: +d.year,
      population: +d.population,
    };
  });
  // append population size to patent data set
  filteredPatentData.forEach((d) => {
    d.population = populationByCountry[d.country] ? populationByCountry[d.country].population : {};
  });
  console.log(filteredPatentData);

  // create mapping table between country name and normed patent data
  const rowByCountry = new Map();
  filteredPatentData.forEach((d) => {
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
