import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import PieChartGen from '../../charttools/usePieChart';
import { Button, Typography } from '@mui/material';
import { schemeRdYlBu } from 'd3-scale-chromatic';

const width = 400;
const height = 300;

const PieChart = () => {
  const categoryData = useStoreState((state) => state.categoryData);
  const selectedYear = useStoreState((state) => state.selectedYear);
  const clickedCountry = useStoreState((state) => state.clickedCountry);
  const setClickedCountry = useStoreActions((actions) => actions.setClickedCountry);

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
    width: width - 50,
    height: height,
    colors: schemeRdYlBu[9],
  });

  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h6" component="div">
        Patent Categories {clickedCountry}
      </Typography>

      {clickedCountry ? (
        <>
          <svg width={width} height={height}>
            <g
              transform={`translate(${width * 0.5},${height * 0.5})`}
              dangerouslySetInnerHTML={{ __html: pieChart.innerHTML }}
            ></g>
          </svg>
          <Typography sx={{ mt: 2 }}>(Share of each category in %)</Typography>
          <Button onClick={() => setClickedCountry(null)} sx={{ mt: 2, textAlign: 'center' }}>
            Deselect
          </Button>
        </>
      ) : (
        <Typography sx={{ my: 20 }}>Please click on a country or bubble...</Typography>
      )}
    </>
  );
};

export default PieChart;
