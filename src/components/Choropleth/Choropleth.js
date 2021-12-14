import React from 'react';
import { useMapData } from './useMapData';
import { usePatentData } from '../../datatools/usePatentData';
import { Marks } from './Marks';
import { scaleSequential, max, interpolatePuBu } from 'd3';

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const selectedYear = 2008;

const Colorpleth = () => {
    const mapData = useMapData();
    const patentData = usePatentData();
    
    if (!mapData || !patentData) {
        return <p>Loading...</p>;
    }
    const filteredData = patentData.filter(d => d.c0 === selectedYear);
    const colorValue = d => d.c2;

    const rowByCountry = new Map();
    filteredData.forEach(d => {
        rowByCountry.set(d.c1, d)
    })

    const colorScale = scaleSequential(interpolatePuBu)
        .domain([0, 20000]) //max(filteredData, colorValue

    return (
        <svg width={width} height={height}>
            <Marks 
                mapData={mapData} 
                width={width}
                height={height}
                rowByCountry={rowByCountry}
                colorScale={colorScale}
                colorValue={colorValue}
            />
        </svg>
    );
}

export default Colorpleth
