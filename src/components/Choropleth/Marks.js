import { geoPath, geoMercator } from 'd3';

const missingDataColor = 'darkgray';

export const Marks = ({
  mapData,
  width,
  height,
  rowByCountry,
  colorScale,
  colorValue }) => {

  const projection = geoMercator().scale(500).translate([width / 2, height]);
  const path = geoPath(projection);

  return (
    <g className="marks">
      {mapData.features.map(feature => {
        const d = rowByCountry.get(feature.properties.geounit)

        if(!d){
          console.log("Name doesn't match: " + feature.properties.geounit)
        }

        return <path
          fill={d ? colorScale(colorValue(d)) : missingDataColor}
          className='land'
          d={path(feature)}
        />
      })}
    </g>
  );
};

// fill={colorScale(colorValue(d))}