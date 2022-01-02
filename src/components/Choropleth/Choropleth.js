import React, { useRef } from 'react';
import { useMapData } from './useMapData';
import { usePatentData } from '../../datatools/usePatentData';
import Marks from './Marks';
import { scaleThreshold } from 'd3'; // scaleSequential
import { schemeBlues } from 'd3-scale-chromatic';

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const selectedYear = 2008;
const legendTitle = 'Number of Patents registered per Year';

const Colorpleth = () => {
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
    .range(schemeBlues[6]);

  return (
    <>
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
    </>
  );
};

export default Colorpleth;
