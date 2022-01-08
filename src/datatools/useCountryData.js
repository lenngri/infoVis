import { useState, useEffect } from 'react';
import { json } from 'd3';

const dataUrl = 'data/europeanCountries.json';

export const useCountryData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(dataUrl).then((data) => {
      setData(data);
    });
  }, []);

  return data;
};
