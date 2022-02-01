import { useStoreState, useStoreActions } from 'easy-peasy';
import { Typography } from '@mui/material';
import { handleMouseEnter, handleMouseLeave } from '../../charttools/useMouseHover';
import { useState } from 'react';

const CountryList = () => {
  const data = useStoreState((state) => state.data);
  const setData = useStoreActions((actions) => actions.setData);
  const selectedYear = useStoreState((state) => state.selectedYear);

  const [renderFlag, setRenderFlag] = useState(false);

  const handleToggle = (data, country) => () => {
    data.forEach((entry) => {
      if (entry.country === country) {
        entry.selected = !entry.selected;
        console.log(entry.country + ': ' + entry.selected);
      }
    });

    setData(data);
    setRenderFlag(!renderFlag);
  };

  const listElement = {
    height: 75,
    xOffset: 20,
  };

  const viewBox = {
    y: data.filter((d) => d.year === selectedYear).length * listElement.height,
    x: 300,
  };

  return (
    <>
      <Typography sx={{ mt: 4, mb: 2, width: 400 }} variant="h5" component="div">
        <strong>Countries:</strong> Pending of {data.filter((d) => d.year === selectedYear).length}{' '}
        selected
      </Typography>
      <div class="listWrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 ' + viewBox.x + ' ' + viewBox.y}>
          {data
            .filter((d) => d.year === selectedYear)
            .map(
              (object, i) => {
                console.log(object.country + ': ' + object.selected);
                const y = listElement.height * i;
                return (
                  <>
                    <rect
                      height={listElement.height}
                      y={y}
                      class="listItemWrapper"
                      id={'List_' + object.country}
                      onMouseEnter={(e) => handleMouseEnter(e, ['Map_', 'Bubblechart_'])}
                      onMouseLeave={(e) => handleMouseLeave(e, ['Map_', 'Bubblechart_'])}
                      onClick={handleToggle(data, object.country)}
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
                    <text x={listElement.xOffset + 200} y={y + listElement.height / 2}>
                      {object.selected ? '🟢 ' : '⚪'}
                    </text>
                  </>
                );
              }

              // <li
              //   class="listItemWrapper"
              //   id={'List_' + object.country}
              //   onMouseEnter={(e) => handleMouseEnter(e, ['Map_', 'Bubblechart_'])}
              //   onMouseLeave={(e) => handleMouseLeave(e, ['Map_', 'Bubblechart_'])}
              // >

              /* <div>
                <div class="flag">{object.flag}</div>
                <div class="text">
                  <div class="country">{object.country}</div>
                  <div class="patents">Patents: {object.patents}</div>
                </div>
                <div class="listCheckbox">
                  <input type="checkbox" ></input>
                </div>
              </div>
            </li> */
            )}
        </svg>
      </div>
    </>
  );
};

export default CountryList;
