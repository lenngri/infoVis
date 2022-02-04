import { useStoreState, useStoreActions } from 'easy-peasy';
import { Box, Typography, Button } from '@mui/material';
import { handleMouseEnter, handleMouseLeave } from '../../charttools/useMouseHover';

const CountryList = () => {
  const setData = useStoreActions((actions) => actions.setData);
  const data = useStoreState((state) => state.data);
  const selectedYear = useStoreState((state) => state.selectedYear);
  const currentData = data[selectedYear];
  const renderFlag = useStoreState((state) => state.renderFlag);
  const setRenderFlag = useStoreActions((actions) => actions.setRenderFlag);

  // allows to sort array of data objects by any attribute of said objects
  // source: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  const sortData = (data, attribute) => {
    return data.sort((a, b) =>
      a[attribute] > b[attribute] ? 1 : b[attribute] > a[attribute] ? -1 : 0
    );
  };

  // sets value of "selected" in country object of each year in data object to true
  // invoked onCLick() in countryList. Used to select and deselect countries.
  const toggleOne = function (data, country) {
    console.log('Country toggled.');
    for (let year in data) {
      data[year].forEach((object) => {
        if (object.country === country) {
          object.selected = !object.selected;
        }
      });
    }
    setData(data); //sets global data object in store
    setRenderFlag(!renderFlag); //forces rerender of components
  };

  const toggleAll = (data, currentData) => {
    console.log(currentData.length === currentData.filter((obj) => obj.selected === true).length);
    if (currentData.length === currentData.filter((obj) => obj.selected === true).length) {
      for (let year in data) {
        data[year].map((object) => (object.selected = false));
      }
    } else {
      for (let year in data) {
        data[year].map((object) => (object.selected = true));
      }
    }
    setData(data); //sets global data object in store
    setRenderFlag(!renderFlag); //forces rerender of components
  };

  const listElement = {
    height: 75,
    xOffset: 20,
  };

  const viewBox = {
    y: currentData.length * listElement.height,
    x: 300,
  };

  return (
    <>
      <Box sx={{ width: 300, textAlign: 'center' }}>
        <Typography sx={{ mt: 4, mb: 1 }} variant="h6" component="div">
          Countries:
        </Typography>
        <Typography>
          {' '}
          {currentData.filter((obj) => obj.selected === true).length} of {currentData.length}{' '}
          selected{' '}
        </Typography>
      </Box>
      <Button onClick={() => toggleAll(data, currentData)} sx={{ width: 300, textAlign: 'center' }}>
        {currentData.length === currentData.filter((obj) => obj.selected === true).length
          ? 'Deselect All'
          : 'Select All'}
      </Button>
      <div className="listWrapper">
        <svg viewBox={'0 0 ' + viewBox.x + ' ' + viewBox.y}>
          {sortData(currentData, 'country').map((object, i) => {
            const y = listElement.height * i;
            return (
              <g
                key={object.country}
                onClick={() => toggleOne(data, object.country)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  style={{ cursor: 'pointer' }}
                  height={listElement.height}
                  y={y}
                  className="listItemWrapper"
                  id={'List_' + object.country}
                  onMouseEnter={(e) => handleMouseEnter(e, ['Map_', 'Bubblechart_'])}
                  onMouseLeave={(e) => handleMouseLeave(e, ['Map_', 'Bubblechart_'])}
                />
                <text
                  className="countryFlag"
                  fill={'black'}
                  x={listElement.xOffset}
                  y={y + listElement.height / 2}
                >
                  {object.flag}
                </text>
                <text
                  className="countryText"
                  fill={'black'}
                  x={listElement.xOffset + 30}
                  y={y + listElement.height / 2}
                >
                  {object.country}
                </text>
                <text x={listElement.xOffset + 220} y={y + listElement.height / 2}>
                  {object.selected ? '🟢 ' : '⚪'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </>
  );
};

export default CountryList;
