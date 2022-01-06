import { geoPath, geoMercator } from 'd3';
import Legend from '../../charttools/useLegend';

const missingDataColor = 'darkgray';

const Marks = ({ mapData, width, height, rowByCountry, colorScale, colorValue, legendTitle }) => {
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
