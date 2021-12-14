import { geoPath, geoMercator } from 'd3';



export const Marks = ({data, width, height}) => {

  const projection = geoMercator().scale(500).translate([width / 2, height]);
  const path = geoPath(projection);

  return (
    <g className="marks">
      {data.features.map(feature => (
        <path className='land' d={path(feature)}/>
      ))}
    </g>
  );
};