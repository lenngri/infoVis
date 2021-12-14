import React from 'react';
import { useMapData } from './useMapData';
import { Marks } from './Marks';

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const Colorpleth = () => {
    const mapData = useMapData();
    console.log(mapData)
    
    if (!mapData) {
        return <p>Loading...</p>;
    }

    return (
        <svg width={width} height={height}>
            <Marks data={mapData} width={width} height={height} />
        </svg>
    );
}

export default Colorpleth
