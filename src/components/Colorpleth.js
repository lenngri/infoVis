import React from 'react';
import { useMapData } from '../datatools/useMapData';
import { geoPath, geoMercator} from 'd3';

const width = 960;
const height = 500;

const projection = geoMercator();
const path = geoPath(projection);

const Colorpleth = () => {
    const mapData = useMapData();
    console.log(mapData)
    
    if (!mapData) {
        return <pre>Loading...</pre>;
      }

    return (
        <svg width={width} height={height}>
            {mapData.map(feature => (
                <path d={path(feature)} style={{ fill: '#137B80'}}/>
            ))}
        </svg>
    );
}

export default Colorpleth
