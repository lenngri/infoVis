import { useState, useEffect } from 'react';
import { json } from 'd3';

const dataUrl = 'data/patents_by_year_country_category_1996_2014.json';

export const usePatentCategoryData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(dataUrl).then((data) => {
      setData(data);
    });
  }, []);

  return data;
};
