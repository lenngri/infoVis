import { useState, useEffect } from 'react';
import { json } from 'd3';

const dataUrl = 'data/patents_by_year_and_country_name.json';

export const usePatentData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(dataUrl).then((data) => {
      setData(data);
    });
  }, []);

  return data;
};
