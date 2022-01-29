import React from 'react';
import { useStoreState } from 'easy-peasy';
import PieChartGen from '../../charttools/usePieChart';

const width = 400;
const height = 500;

const PieChart = () => {
  const categoryData = useStoreState((state) => state.categoryData);
  const selectedYear = useStoreState((state) => state.selectedYear);

  if (!categoryData) {
    return <p>Loading...</p>;
  }

  // filter data for selected year
  const filteredData = categoryData.filter((d) => d.year === selectedYear);

  const pieChart = PieChartGen(filteredData, {
    name: (d) => d.country,
    value: (d) => d.patents,
    width,
    height: height,
  });

  console.log(pieChart);

  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${width * 0.5},${height * 0.5})`}
        dangerouslySetInnerHTML={{ __html: pieChart.innerHTML }}
      ></g>
    </svg>
  );
};

export default PieChart;
