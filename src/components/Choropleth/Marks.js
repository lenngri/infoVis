import { useEffect, useRef } from 'react';
import { geoPath, geoMercator } from 'd3';
import Legend from '../../charttools/useLegend';

const missingDataColor = 'darkgray';

const Marks = ({ mapData, width, height, rowByCountry, colorScale, colorValue, legendTitle }) => {
  // generate map progjection and paths
  const projection = geoMercator()
    .scale(500)
    .translate([width / 2, height]);
  const path = geoPath(projection);

  // generate map legend and append to svg
  const legendRef = useRef(null);
  const legend = Legend(colorScale, { title: legendTitle });
  useEffect(() => {
    if (legendRef.current) {
      legendRef.current.appendChild(legend);
    }
  }, [legend, legendRef]);

  return (
    <>
      <g className="marks">
        {mapData.features.map((feature) => {
          const d = rowByCountry.get(feature.properties.geounit);

          if (!d) {
            console.log("Name doesn't match: " + feature.properties.geounit);
          }

          return (
            <path
              fill={d ? colorScale(colorValue(d)) : missingDataColor}
              className="land"
              d={path(feature)}
            />
          );
        })}
      </g>
      <g ref={legendRef}></g>
    </>
  );
};

export default Marks;
