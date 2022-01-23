import { geoPath, geoMercator } from 'd3';
import Legend from '../../charttools/useLegend';
import { handleMouseEnter, handleMouseLeave } from '../../charttools/useMouseHover';

const missingDataColor = 'darkgray';

const Marks = ({ mapData, width, height, rowByCountry, colorScale, colorValue, legendTitle }) => {
  // Append CSS class to HTMLelement based on mouse event
  // Source: https://stackoverflow.com/questions/927312/how-to-append-a-css-class-to-an-element-by-javascript (11.01.2021)

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
              key={feature.properties.name}
              fill={d ? colorScale(colorValue(d)) : missingDataColor}
              d={path(feature)}
              onMouseEnter={(e) => handleMouseEnter(e, ['Bubblechart_', 'List_'])}
              onMouseLeave={(e) => handleMouseLeave(e, ['Bubblechart_', 'List_'])}
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
