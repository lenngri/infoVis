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
      <Typography sx={{ mt: 4, mb: 1, width: 300 }} variant='h6' component='div'>
        <strong>Countries:</strong>
      </Typography>
      <Typography>
        {' '}
        <strong>Pending of {data.filter((d) => d.year === selectedYear).length} selected </strong>
      </Typography>
      <div class='listWrapper'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox={'0 0 ' + viewBox.x + ' ' + viewBox.y}>
          {data
            .filter((d) => d.year === selectedYear)
            .map((object, i) => {
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
                    class='listItemWrapper'
                    id={'List_' + object.country}
                    onMouseEnter={(e) => handleMouseEnter(e, ['Map_', 'Bubblechart_'])}
                    onMouseLeave={(e) => handleMouseLeave(e, ['Map_', 'Bubblechart_'])}
                  />
                  <text
                    className='countryFlag'
                    fill={'black'}
                    x={listElement.xOffset}
                    y={y + listElement.height / 2}
                  >
                    {object.flag}
                  </text>
                  <text
                    className='countryText'
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
