import { useState, useEffect } from 'react';
import { json } from 'd3';

const dataUrl = 'data/population_europ.json';

export const usePopulationData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(dataUrl).then((data) => {
      setData(data);
    });
  }, []);

  return data;
};
