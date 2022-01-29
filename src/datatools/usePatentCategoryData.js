import { useState, useEffect } from 'react';
import { useCountryData } from './useCountryData';
import { json } from 'd3';

const dataUrl = 'data/patents_by_year_country_category_1996_2014.json';

export const usePatentCategoryData = () => {
  const [data, setData] = useState(null);

  const countryData = useCountryData();

  useEffect(() => {
    json(dataUrl).then((data) => {
      setData(data);
    });
  }, []);

  if (!countryData || !data) {
    return null;
  }

  const filteredData = data.filter((o1) => countryData.some((o2) => o1.country === o2.name));

  return filteredData;
};
