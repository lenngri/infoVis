import { useState } from 'react';
import { geoPath, geoMercator } from 'd3';
import Legend from '../../charttools/useLegend';

const missingDataColor = 'darkgray';

const Marks = ({ mapData, width, height, rowByCountry, colorScale, colorValue, legendTitle }) => {
  const [mouseHover, setMouseHover] = useState(false);

  // Append CSS class to HTMLelement based on mouse event
  // Source: https://stackoverflow.com/questions/927312/how-to-append-a-css-class-to-an-element-by-javascript (11.01.2021)
  const handleMouseEnter = (e) => {
    setMouseHover(!mouseHover);
    const pathElement = e.target;
    pathElement.classList.remove('land');
    pathElement.classList.add('highlight');

    const bubble = document.getElementById('Bubblechart_' + e.target.id.split('_')[1]);
    if (bubble) bubble.classList.add('highlight');
  };

  const handleMouseLeave = (e) => {
    setMouseHover(!mouseHover);
    const pathElement = e.target;
    pathElement.classList.remove('highlight');
    pathElement.classList.add('land');

    const bubble = document.getElementById('Bubblechart_' + e.target.id.split('_')[1]);
    if (bubble) bubble.classList.remove('highlight');
  };

  // generate map progjection and paths
  const projection = geoMercator()
    .scale(500)
    .translate([width / 3, height * 1.5]);
  const path = geoPath(projection);

  // generate map legend and append to svg,
  // follows https://stackoverflow.com/questions/45877087/render-svgsvgelement-in-react-js-without-dangerouslysetinnerhtml
  const legend = Legend(colorScale, { title: legendTitle });

  return (
    <>
      <g className="marks">
        {mapData.features.map((feature) => {
          const d = rowByCountry.get(feature.properties.name);
          const value = d ? colorValue(d) : 'no data';
          const title = `${feature.properties.name}: ${value}`;
          // if (!d) {
          //   console.log("Name doesn't match: " + feature.properties.geounit);
          // }

          return (
            <path
              id={'Map_' + feature.properties.name}
              className="land"
              fill={d ? colorScale(colorValue(d)) : missingDataColor}
              d={path(feature)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <title>{title}</title>
            </path>
          );
        })}
      </g>
      <g
        transform={`translate(${width * 0.65},${height * 0.9})`}
        // follows https://stackoverflow.com/questions/45877087/render-svgsvgelement-in-react-js-without-dangerouslysetinnerhtml
        // and https://stackoverflow.com/questions/26815738/svg-use-tag-and-reactjs
        dangerouslySetInnerHTML={{ __html: legend.innerHTML }}
      ></g>
    </>
  );
};

export default Marks;
