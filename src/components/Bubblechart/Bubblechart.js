import React from 'react';
import { scaleLinear, extent, format } from 'd3';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import Marks from './Marks';
import { useStoreState } from 'easy-peasy';

const width = 1000;
const height = 600;
const margin = { top: 20, right: 30, bottom: 150, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

function Bubblechart({ colorValue, colorScale }) {
  const data = useStoreState((state) => state.data);
  const selectedYear = useStoreState((state) => state.selectedYear);
  const scheme = useStoreState((state) => state.scheme);

  if (!data || !scheme) {
    return <pre>Loading...</pre>;
  }

  console.log('Succefully loaded Bubblechart');

  // filter data for selected year
  const filteredData = data.filter((d) => d.year === selectedYear && d.population);
  filteredData.sort((a, b) => Number(b.population) - Number(a.population));

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d) => d.investment;
  const xAxisLabel = 'Investment in Research & Development (as % of GDP)';

  const yValue = (d) => d.patents / (d.population / 1000000);
  const yAxisLabel = 'Number of Patents per million inhabitants (ppm)';

  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) => siFormat(tickValue);

  const xScale = scaleLinear().domain(extent(data, xValue)).range([0, innerWidth]).nice();
  const yScale = scaleLinear().domain([0, 2200]).range([innerHeight, 0]).nice();

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

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight + 50}
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
          y={innerHeight + xAxisLabelOffset + 50}
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
          colorScale={scheme.colorScale}
          colorValue={scheme.colorValue}
        />
      </g>
    </svg>
  );
}

export default Bubblechart;
