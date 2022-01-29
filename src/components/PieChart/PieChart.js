import React from 'react';
import { useStore, useStoreState } from 'easy-peasy';
import usePieChart from '../../charttools/usePieChart';

const width = 400;
const height = 400;

const PieChart = () => {
  const patentCategoryData = useStoreState((state) => state.patentCategoryData);

  // const pieChart = usePieChart(filteredData, { title: legendTitle });

  return <svg width={width} height={height}></svg>;
};

export default PieChart;
