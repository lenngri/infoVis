import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson-client';

const dataUrl = 'data/europe.json';

export const useMapData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(dataUrl).then((topology) => {
      const europe_countries = topology.objects.continent_Europe_subunits;
      const featureCollection = feature(topology, europe_countries);
      setData(featureCollection);
    });
  }, []);

  return data;
};
