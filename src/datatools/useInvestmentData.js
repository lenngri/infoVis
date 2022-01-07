import { useState, useEffect } from 'react';
import { json } from 'd3';

const dataUrl = 'data/R&D_expenditure.json';

export const useInvestmentData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(dataUrl).then((data) => {
      setData(data);
    });
  }, []);

  return data;
};
