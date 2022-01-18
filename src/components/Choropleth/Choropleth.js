// Based on
// Source: Curran Kelleher, 2018 https://www.youtube.com/watch?v=OoZ0LWD9KUs
// Source: https://github.com/viswesh/Maps/tree/master/chapter1
import { useMapData } from './useMapData';
import { useStoreState } from 'easy-peasy';
import Marks from './Marks';

const width = 900; // Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const height = 600; // Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const Choropleth = () => {
  const mapData = useMapData();
  const data = useStoreState((state) => state.data);
  const view = useStoreState((state) => state.view);
  const scheme = useStoreState((state) => state.scheme);
  const selectedYear = useStoreState((state) => state.selectedYear);

  if (!mapData || !data || !scheme) {
    return <p>Loading...</p>;
  }

  console.log('Succefully loaded Choropleth');

  // filter data for selected year
  const filteredData = data.filter((d) => d.year === selectedYear);

  // create mapping table for map data joining
  const rowByCountry = new Map();
  filteredData.forEach((d) => {
    rowByCountry.set(d.country, d);
    // console.log(
    //   `Patent registrations in ${d.country} per Million Inhabitants: ${
    //     d.patents / (d.population / 1000000)
    //   }`
    // );
    // console.log(`R&D investments in % of GDP: ${Number(d.investment.replace(',', '.'))}`);
  });

  // set colorValue function, colorScale object and legendTitle
  let legendTitle;
  let mapTitle;
  if (view === 'investments') {
    legendTitle = 'R&D Expenditure in % of GPD';
    mapTitle = `R&D Expenditure in `;
  } else {
    legendTitle = 'Patents Registered per Million Inhabitants';
    mapTitle = `Number of Patents Registered in `;
  }

  return (
    <>
      {/* {mapTitle + selectedYear} */}
      <p className="center"></p>
      <svg width={width} height={height}>
        <Marks
          mapData={mapData}
          width={width}
          height={height}
          rowByCountry={rowByCountry}
          colorScale={scheme.colorScale}
          colorValue={scheme.colorValue}
          legendTitle={legendTitle}
        />
      </svg>
    </>
  );
};

export default Choropleth;
