import React from 'react';
import { scaleLinear, extent, format, scaleThreshold } from 'd3';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import Marks from './Marks';
import { useData } from '../../datatools/useData';
import { schemeBlues } from 'd3-scale-chromatic';

const width = 1000;
const height = 600;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

function Bubblechart({ view, selectedYear }) {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  // filter data for selected year
  const filteredData = data.filter((d) => d.year === selectedYear && d.population);
  filteredData.sort((a, b) => Number(b.population) - Number(a.population));

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d) => d.investment;
  const xAxisLabel = 'Investment in Research & Development (as % of GDP)';

  const yValue = (d) => d.patents / (d.population / 1000000);
  const yAxisLabel = 'Number of Patents per million inhabitants';

  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) => siFormat(tickValue);

  const xScale = scaleLinear().domain(extent(data, xValue)).range([0, innerWidth]).nice();

  const yScale = scaleLinear().domain(extent(data, yValue)).range([innerHeight, 0]).nice();

  const populationTotal = (obj) => {
    let sum = 0;
    for (var country in obj) {
      if (obj[country].population) {
        sum += parseFloat(obj[country].population);
      }
    }
    return sum;
  };

  const averagePopulation = populationTotal(filteredData) / filteredData.length;

  let colorValue;
  let colorScale;
  if (view === 1) {
    colorValue = (d) => d.investment;
    colorScale = scaleThreshold().domain([0.5, 0.75, 1.0, 1.5, 2.0, 2.5]).range(schemeBlues[7]);
  } else {
    colorValue = (d) => d.patents / (d.population / 1000000);
    colorScale = scaleThreshold().domain([10, 50, 100, 500, 1000, 1500]).range(schemeBlues[7]);
  }

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          data={filteredData}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          toolTipFormat={xAxisTickFormat}
          averagePopulation={averagePopulation}
          circleRadius={40}
          colorScale={colorScale}
          colorValue={colorValue}
        />
      </g>
    </svg>
  );
}

export default Bubblechart;
