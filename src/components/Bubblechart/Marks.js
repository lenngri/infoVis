import { useState } from 'react';

const missingDataColor = 'darkgray';

const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  toolTipFormat,
  averagePopulation,
  circleRadius,
  colorScale,
  colorValue,
}) => {
  const [mouseHover, setMouseHover] = useState(false);

  // Append CSS class to HTMLelement based on mouse event
  // Source: https://stackoverflow.com/questions/927312/how-to-append-a-css-class-to-an-element-by-javascript (11.01.2021)
  const handleMouseEnter = (e) => {
    setMouseHover(!mouseHover);
    const pathElement = e.target;
    pathElement.classList.remove('land');
    pathElement.classList.add('highlight');
  };

  const handleMouseLeave = (e) => {
    setMouseHover(!mouseHover);
    const pathElement = e.target;
    pathElement.classList.remove('highlight');
    pathElement.classList.add('land');
  };

  // generate map legend and append to svg,
  // follows https://stackoverflow.com/questions/45877087/render-svgsvgelement-in-react-js-without-dangerouslysetinnerhtml
  const zIndex = 1;

  return data.map((d) => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={((d.population / averagePopulation) * circleRadius) / Math.PI}
      fill={d ? colorScale(colorValue(d)) : missingDataColor}
      style={{ zIndex: { zIndex } }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <title>{d.country + ': ' + d.investment}</title>
    </circle>
  ));
};

export default Marks;
