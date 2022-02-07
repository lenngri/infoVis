import React from 'react';
import { useStoreState } from 'easy-peasy';
import PieChartGen from '../../charttools/usePieChart';
import { Typography } from '@mui/material';
import { schemeRdYlBu } from 'd3-scale-chromatic';
import Swatches from '../../charttools/useSwatches';
import * as d3 from 'd3'; // can be optimized by importing just necessary modules

const width = 400;
const height = 320;

const PieChart = () => {
  const categoryData = useStoreState((state) => state.categoryData);
  const selectedYear = useStoreState((state) => state.selectedYear);
  const clickedCountry = useStoreState((state) => state.clickedCountry);
  // const setClickedCountry = useStoreActions((actions) => actions.setClickedCountry);

  if (!categoryData) {
    return <p>Loading...</p>;
  }

  // filter data for selected year
  const filteredByYear = categoryData.filter((d) => d.year === selectedYear);
  // filter data for clicked country
  const filteredByCountry = filteredByYear.filter((d) => d.country === clickedCountry);
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
    height: height - 20,
    colors: schemeRdYlBu[9],
    labelRadius: 100,
  });

  const legend = Swatches(
    d3.scaleOrdinal(
      [
        'Human Necessities',
        'Transporting',
        'Chemistry / Metallurgy',
        'Textiles / Paper',
        'Fixed Constructions',
        'Mechanical Engineering',
        'Physics',
        'Electricity',
        'No Category',
      ],
      d3.schemeRdYlBu[9]
    ),
    {
      columns: '195px',
    }
  );

  // Returns content of PieChart Wrapper component, e.g. PieChartDialog
  // if used outside of a dialog, please uncomment the Button and lower Typography
  return (
    <>
      <Typography variant="h6" component="div">
        {clickedCountry} {selectedYear}
      </Typography>

      {clickedCountry && filteredByCountry.length > 0 ? (
        <>
          <Typography sx={{ mb: 2 }}>(Share of each category in %)</Typography>
          <svg width={width} height={height}>
            <g
              transform={`translate(${width * 0.5},${height * 0.5})`}
              dangerouslySetInnerHTML={{ __html: pieChart.innerHTML }}
            ></g>
          </svg>
          <div dangerouslySetInnerHTML={{ __html: legend.innerHTML }}></div>
          {/* <Button onClick={() => setClickedCountry(null)} sx={{ mt: 2, textAlign: 'center' }}>
            Deselect
          </Button> */}
        </>
      ) : (
        <Typography sx={{ my: 20 }}>This country doesn't have any patent data.</Typography>
        // <Typography sx={{ my: 20 }}>Please click on a country or bubble...</Typography>
      )}
    </>
  );
};

export default PieChart;
