import React, {useEffect, useRef} from 'react';
import { useMapData } from '../datatools/useMapData';
import { select, zoom, zoomTransform} from 'd3';
import { geoPath, geoMercator } from 'd3';

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const projection = geoMercator()
    .scale(400) // 130
    .translate([width / 2, height / 1]); // 1.5;
const path = geoPath(projection);

const Colorpleth = () => {

    const d3Chart = useRef();

    const mapData = useMapData();
    console.log(mapData)

    useEffect(() => {
        
        // Set up Map
        const svg = select(d3Chart.current)
            .attr('viewBox', '50 10 ' + width + ' ' + height)
            .attr('preserveAspectRatio', 'xMinYMin')
            .style('background-color', 'lightgray')
            .style('cursor', 'move');

        // const zoom = zoom()
        //     .on('zoom', function () {
        //         var transform = d3.zoomTransform(this);
        //         map.attr('transform', transform);
        // });

        // svg.call(zoom);

        const map = svg.append('g')
            .attr('class', 'map');

        map.append("g")
            .selectAll("path")
            .data(mapData)
            .enter().append("path")
            .attr("name", function (d) {
                return d.properties.geounit;
            })
            .attr("id", function (d) {
                return d.id;
            })
            .attr("d", path)
        
    }, [mapData])

    return (
        // <svg width={width} height={height}>
        //     {mapData.map(feature => (
        //         <path d={path(feature)} style={{ fill: '#137B80'}}/>
        //     ))}
        // </svg>
        <div id='d3Map'>
            <svg ref={d3Chart}></svg>
        </div>
    );
}

export default Colorpleth
