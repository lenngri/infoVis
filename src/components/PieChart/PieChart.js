import React from 'react';
import { useStoreState } from 'easy-peasy';
import PieChartGen from '../../charttools/usePieChart';

const width = 500;
const height = 400;

const PieChart = () => {
  const categoryData = useStoreState((state) => state.categoryData);
  const selectedYear = useStoreState((state) => state.selectedYear);
  const clickedCountry = useStoreState((state) => state.clickedCountry);

  if (!categoryData) {
    return <p>Loading...</p>;
  }

  // filter data for selected year
  const filteredData = categoryData.filter((d) => d.year === selectedYear);
  // filter data for clicked country
  const filteredByCountry = filteredData.filter((d) => d.country === clickedCountry);
  // get total amount of category registrations
  let total = 0;
  filteredByCountry.forEach((d) => {
    total += Number(d.patents);
  });
  filteredByCountry.forEach((d) => {
    d.total = total;
  });

  const pieChart = PieChartGen(filteredByCountry, {
    name: (d) => d.category,
    value: (d) => ((d.patents / d.total) * 100).toFixed(2),
    width: 400,
    height: 400,
  });

  return (
    <>
      <p>{clickedCountry} (Patent Categories in %)</p>
      <svg width={width} height={height}>
        <g
          transform={`translate(${width * 0.5},${height * 0.5})`}
          dangerouslySetInnerHTML={{ __html: pieChart.innerHTML }}
        ></g>
      </svg>
    </>
  );
};

export default PieChart;
