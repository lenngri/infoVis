import { useState, useEffect } from 'react';
import { json } from 'd3';

const jsonUrl = 'data/patents_by_year_and_country_name.json';

export const usePatentData = () => {
  const [data, setData] = useState(null);
  console.log('Hello from useData')

  useEffect(() => {
    json(jsonUrl).then(data => {
      setData(data);
    });
  }, []);

  return data;
};