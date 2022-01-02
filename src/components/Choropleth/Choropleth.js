import React from 'react';
import { useMapData } from './useMapData';
import { usePatentData } from '../../datatools/usePatentData';
import { Marks } from './Marks';
import { scaleThreshold, max, interpolatePuBu } from 'd3'; // scaleSequential

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const selectedYear = 2008;

const Colorpleth = () => {
  const mapData = useMapData();
  const patentData = usePatentData();

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
    .range(['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c']);

  return (
    <svg width={width} height={height}>
      <Marks
        mapData={mapData}
        width={width}
        height={height}
        rowByCountry={rowByCountry}
        colorScale={colorScale}
        colorValue={colorValue}
      />
    </svg>
  );
};

export default Colorpleth;
