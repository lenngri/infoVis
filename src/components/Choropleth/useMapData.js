import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson-client';

const jsonUrl = 'data/europe.json';

export const useMapData = () => {
  const [data, setData] = useState(null);
  console.log('Hello from useData');

  useEffect(() => {
    json(jsonUrl).then((topology) => {
      const europe_countries = topology.objects.continent_Europe_subunits;
      const featureCollection = feature(topology, europe_countries);
      setData(featureCollection);
    });
  }, []);

  return data;
};
