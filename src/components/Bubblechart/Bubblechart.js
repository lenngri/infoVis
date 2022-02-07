import React from 'react';
import { scaleLinear, format } from 'd3';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import Marks from './Marks';
import { useStoreState } from 'easy-peasy';
import { Typography, Stack, Box } from '@mui/material';
import Tooltips from '../Tooltips';

const width = 880;
const height = 600;
const margin = { top: 20, right: 30, bottom: 150, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

function Bubblechart() {
  const selectedYear = useStoreState((state) => state.selectedYear);
  const scheme = useStoreState((state) => state.scheme);
  const currentData = useStoreState((state) => state.data[selectedYear]);
  // eslint-disable-next-line
  const renderFlag = useStoreState((state) => state.renderFlag);

  if (!currentData || !scheme) {
    return <pre>Loading...</pre>;
  }

  console.log('Succefully loaded Bubblechart');

  // sort data by population size to adjust z-index of bubbles
  currentData.sort((a, b) => Number(b.population) - Number(a.population));

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (data) => data.investment;
  const xAxisLabel = 'Investment in Research & Development (as % of GDP)';

  const yValue = (data) => data.patents / (data.population / 1000000);
  const yAxisLabel = 'Number of Patents per million inhabitants (ppm)';

  const siFormat = format('');
  const xAxisTickFormat = (tickValue) => siFormat(tickValue);

  const xScale = scaleLinear().domain([0, 4.0]).range([0, innerWidth]).nice();
  const yScale = scaleLinear().domain([0, 800]).range([innerHeight, 0]).nice();

  const populationTotal = (obj) => {
    let sum = 0;
    for (let country in obj) {
      if (obj[country].population) {
        sum += parseFloat(obj[country].population);
      }
    }
    return sum;
  };

  const averagePopulation = populationTotal(currentData) / currentData.length;

  return (
    <>
      <Box sx={{ alignItems: 'center' }}>
        <Stack direction="row" spacing={1}>
          <Typography sx={{ mt: 0.7, ml: 27 }} variant="h6" component="div">
            Patent Inventions - R&D Investment Correlation
          </Typography>
          <Tooltips
            sx={{ mt: 10 }}
            content={
              'Hover over the bubbles to get more details. Click on a bubble to view the share of patent categories among all inventions.'
            }
          ></Tooltips>
        </Stack>
        <Typography>The bubble size is corresponding to the population of the country</Typography>
      </Box>

      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight + 50}
            tickFormat={xAxisTickFormat}
            tickOffset={5}
          />
          <text
            className="chartText"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
          <text
            className="chartText"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset + 50}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <Marks
            data={currentData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            toolTipFormat={xAxisTickFormat}
            averagePopulation={averagePopulation}
            circleRadius={1000}
            colorScale={scheme.colorScale}
            colorValue={scheme.colorValue}
          />
        </g>
      </svg>
    </>
  );
}

export default Bubblechart;
