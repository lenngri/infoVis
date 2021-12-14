var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var svg = d3.select("body")
    .append("svg")
    .style("cursor", "move");

svg.attr("viewBox", "50 10 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin");

var zoom = d3.zoom()
    .on("zoom", function () {
        var transform = d3.zoomTransform(this);
        map.attr("transform", transform);
    });

svg.call(zoom);

var map = svg.append("g")
    .attr("class", "map");

d3.queue()
    .defer(d3.json, "src/data/europe.json") // europe.json
    // .defer(d3.json, "src/data/population.json")
    .defer(d3.json, "src/data/patents_2008_by_country_name.json")
    .await(function (error, world, data) {
        if (error) {
            console.error('Oh dear, something went wrong: ' + error);
        }
        else {
            console.log(data)
            drawMap(world, data);
        }
    });

function drawMap(world, data) {
    // geoMercator projection
    var projection = d3.geoMercator() //d3.geoOrthographic()
        .scale(500) // 130
        .translate([width / 2, height / 1]); // 1.5

    // geoPath projection
    var path = d3.geoPath().projection(projection);

    //colors for population metrics
    var color = d3.scaleThreshold()
        .domain([100, 1000, 5000, 10000, 50000, 100000])
        .range(['#eff3ff','#c6dbef','#9ecae1','#6baed6','#3182bd','#08519c']);

    var features = topojson.feature(world, world.objects.continent_Europe_subunits).features; // continent_Europe_subunits
    var populationById = {};
    data.forEach(function (d) {
        populationById[d.c1] = {
            year: +d.c0,
            patents: +d.c2
        }
    });

    features.forEach(function (d) {
        d.details = populationById[d.properties.geounit] ? populationById[d.properties.geounit] : {};  // geounit
    });
    console.log(features)

    map.append("g")
        .selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("name", function (d) {
            return d.properties.geounit;
        })
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", path)
        .style("fill", function (d) {
            return d.details && d.details.patents ? color(d.details.patents) : undefined;
        })
        .on('mouseover', function (d) {
            d3.select(this)
                .style("stroke", "white")
                .style("stroke-width", 1)
                .style("cursor", "pointer");

            d3.select(".country")
                .text(d.properties.geounit);

            d3.select(".females")
                .text(d.details && d.details.year && "Year: " + d.details.year || "¯\\_(ツ)_/¯");

            d3.select(".males")
                .text(d.details && d.details.patents && "Number of Patents: " + d.details.patents || "¯\\_(ツ)_/¯");

            d3.select('.details')
                .style('visibility', "visible")
        })
        .on('mouseout', function (d) {
            d3.select(this)
                .style("stroke", null)
                .style("stroke-width", 0.25);

            d3.select('.details')
                .style('visibility', "hidden");
        });
}