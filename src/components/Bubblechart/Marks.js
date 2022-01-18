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
    pathElement.classList.add('highlight');
  };

  const handleMouseLeave = (e) => {
    setMouseHover(!mouseHover);
    const pathElement = e.target;
    pathElement.classList.remove('highlight');
  };

  return data.map((d) => (
    <circle
      id={'Bubblechart_' + d.country}
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={((d.population / averagePopulation) * circleRadius) / Math.PI}
      fill={d ? colorScale(colorValue(d)) : missingDataColor}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <title>
        {d.country +
          '\n % of GDP: ' +
          Math.round((d.investment + Number.EPSILON) * 100) / 100 +
          '\n Patents per million: ' +
          Math.round(d.patents / (d.population / 1000000), 2) +
          '\n Patents: ' +
          Math.round(d.patents, 2) +
          '\n Population: ' +
          Math.round(d.population / 1000000, 2) +
          ' million'}
      </title>
    </circle>
  ));
};

export default Marks;
