import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson-client';

const dataUrl = 'data/eu_map_v1_simplified.json';

export const useMapData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(dataUrl).then((topology) => {
      const featureCollection = feature(topology, topology.objects.collection); // europe
      setData(featureCollection);
      console.log(featureCollection);
    });
  }, []);

  return data;
};
