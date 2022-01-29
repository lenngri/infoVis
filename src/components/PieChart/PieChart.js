import React from 'react';
import { useStoreState } from 'easy-peasy';
import usePieChart from '../../charttools/usePieChart';

const width = 400;
const height = 400;

const PieChart = () => {
  const categoryData = useStoreState((state) => state.categoryData);
  console.log(categoryData);
  const selectedYear = useStoreState((state) => state.selectedYear);

  if (!categoryData) {
    return <p>Loading...</p>;
  }

  // filter data for selected year
  const filteredData = categoryData.filter((d) => d.year === selectedYear);
  console.log(filteredData);

  // const pieChart = usePieChart(filteredData, { title: legendTitle });

  return <svg width={width} height={height}></svg>;
};

export default PieChart;
