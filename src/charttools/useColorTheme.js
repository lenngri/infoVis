import { scaleThreshold } from 'd3'; // scaleSequential
import { schemeBlues } from 'd3-scale-chromatic';

const scheme = schemeBlues[7];

export const patentColorTheme = () => {
  const colorValue = (d) => d.patents / (d.population / 1000000);
  const colorScale = scaleThreshold().domain([10, 50, 100, 200, 300, 400]).range(scheme);
  const legendTitle = 'Patents Registered per Million Inhabitants';
  return { colorValue, colorScale, legendTitle };
};

export const rDColorTheme = () => {
  const colorValue = (d) => d.investment;
  const colorScale = scaleThreshold().domain([0.5, 0.75, 1.0, 1.5, 2.0, 2.5]).range(scheme);
  const legendTitle = 'R&D Expenditure in % of GPD';
  return { colorValue, colorScale, legendTitle };
};
