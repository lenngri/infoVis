import { useState, useEffect } from 'react';
import { json } from 'd3';

const populationDataUrl = 'data/population_by_year_and_country_name.json';

export const usePopulationData = () => {
  const [populationData, setPopulationData] = useState(null);

  useEffect(() => {
    json(populationDataUrl).then((data) => {
      setPopulationData(data);
    });
  }, []);

  console.log(populationData);

  return populationData;
};
