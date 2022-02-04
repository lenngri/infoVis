import { handleMouseEnter, handleMouseLeave } from '../../charttools/useMouseHover';
import { useStoreActions } from 'easy-peasy';

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
  const changeClickedCountry = useStoreActions((actions) => actions.changeClickedCountry);
  return data
    .filter((d) => {
      return d.selected;
    })
    .map((d) => (
      <circle
        id={'Bubblechart_' + d.country}
        key={d.country}
        className="mark"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={Math.sqrt(((d.population / averagePopulation) * circleRadius) / Math.PI)} // x = pi*r^2 -> r = sqrt(x / pi)
        fill={d ? colorScale(colorValue(d)) : missingDataColor}
        onMouseEnter={(e) => handleMouseEnter(e, ['Map_', 'List_'])}
        onMouseLeave={(e) => handleMouseLeave(e, ['Map_', 'List_'])}
        onClick={(e) => changeClickedCountry(e.target.id.split('_')[1])}
      >
        <title>
          {d.flag +
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
            ' million'}
        </title>
      </circle>
    ));
};

export default Marks;
