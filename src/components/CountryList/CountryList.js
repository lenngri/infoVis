import { useStoreState, useStoreActions } from 'easy-peasy';
import { Typography } from '@mui/material';
import { handleMouseEnter, handleMouseLeave } from '../../charttools/useMouseHover';
import { useState } from 'react';

const CountryList = () => {
  const setData = useStoreActions((actions) => actions.setData);
  const data = useStoreState((state) => state.data);
  const selectedYear = useStoreState((state) => state.selectedYear);
  const currentData = data[selectedYear];
  const renderFlag = useStoreState((state) => state.renderFlag);
  const setRenderFlag = useStoreActions((actions) => actions.setRenderFlag);

  currentData.sort((a, b) => (a.country > b.country ? 1 : b.country > a.country ? -1 : 0));

  const handleToggle = (data, country) => () => {
    for (let year in data) {
      data[year].forEach((object) => {
        if (object.country === country) {
          object.selected = !object.selected;
        }
      });
    }

    setData(data);
    setRenderFlag(!renderFlag);
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
      <Typography sx={{ mt: 4, mb: 1, width: 300 }} variant="h6" component="div">
        <strong>Countries:</strong>
      </Typography>
      <Typography>
        {' '}
        <strong>Pending of {data.length} selected </strong>
      </Typography>
      <div class="listWrapper">
        <svg viewBox={'0 0 ' + viewBox.x + ' ' + viewBox.y}>
          {currentData.map((object, i) => {
            const y = listElement.height * i;
            return (
              <g
                key={object.country}
                onClick={handleToggle(data, object.country)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  style={{ cursor: 'pointer' }}
                  height={listElement.height}
                  y={y}
                  class="listItemWrapper"
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
                <text x={listElement.xOffset + 200} y={y + listElement.height / 2}>
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
