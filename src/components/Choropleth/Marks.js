import { geoPath, geoMercator } from 'd3';
// import Legend from '../../charttools/useLegend';
import { handleMouseEnter, handleMouseLeave } from '../../charttools/useMouseHover';
import { useStoreState, useStoreActions } from 'easy-peasy';

const missingDataColor = 'darkgray';

const Marks = ({ mapData, width, height, rowByCountry, colorScale, colorValue, legendTitle }) => {
  const changeClickedCountry = useStoreActions((actions) => actions.changeClickedCountry);
  // eslint-disable-next-line
  const renderFlag = useStoreState((state) => state.renderFlag);

  // generate map progjection and paths
  const projection = geoMercator()
    .scale(500)
    .translate([width / 3.3, height * 1.5]);
  const path = geoPath(projection);

  // generate map legend and append to svg,
  // follows https://stackoverflow.com/questions/45877087/render-svgsvgelement-in-react-js-without-dangerouslysetinnerhtml
  // const legend = Legend(colorScale, { title: legendTitle });

  return (
    <>
      <g className="marks">
        {mapData.features.map((feature) => {
          const d = rowByCountry.get(feature.properties.name);
          const value = d ? colorValue(d) : 'no data';
          let selected = null;
          let title = null;
          if (d) {
            selected = d.selected;
            title =
              d.flag +
              ' ' +
              d.country +
              '\n % of GDP: ' +
              Math.round((d.investment + Number.EPSILON) * 100) / 100 +
              '\n Patents per million: ' +
              Math.round(d.patents / (d.population / 1000000), 2) +
              '\n Patents: ' +
              Math.round(d.patents, 2) +
              '\n Population: ' +
              Math.round(d.population / 1000000, 2) +
              ' million';
          } else {
            title = `${feature.properties.name}: ${value}`;
          }
          // if (!d) {
          //   console.log("Name doesn't match: " + feature.properties.name);
          // }

          return (
            <path
              id={'Map_' + feature.properties.name}
              className="land"
              key={feature.properties.name}
              fill={d ? colorScale(colorValue(d)) : missingDataColor}
              opacity={selected ? 1.0 : 0.3}
              d={path(feature)}
              onMouseEnter={(e) => handleMouseEnter(e, ['Bubblechart_', 'List_'])}
              onMouseLeave={(e) => handleMouseLeave(e, ['Bubblechart_', 'List_'])}
              onClick={(e) => changeClickedCountry(e.target.id.split('_')[1])}
            >
              <title>{title}</title>
            </path>
          );
        })}
      </g>
      {/* <g
        transform={`translate(${width * 0.55},${height * 0.93})`}
        // follows https://stackoverflow.com/questions/45877087/render-svgsvgelement-in-react-js-without-dangerouslysetinnerhtml
        // and https://stackoverflow.com/questions/26815738/svg-use-tag-and-reactjs
        dangerouslySetInnerHTML={{ __html: legend.innerHTML }}
      ></g> */}
    </>
  );
};

export default Marks;
