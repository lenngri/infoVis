import { useStoreState, useStoreActions } from 'easy-peasy';
import { Box, Typography } from '@mui/material';
import { handleMouseEnter, handleMouseLeave } from '../../charttools/useMouseHover';
import $ from 'jquery';

const CountryList = () => {
  const data = useStoreState((state) => state.data);
  const selectedYear = useStoreState((state) => state.selectedYear);
  const checkedCountries = useStoreState((state) => state.checkedCountries);
  const setCheckedCountries = useStoreActions((actions) => actions.setCheckedCountries);

  const filteredData = data.filter((d) => d.year === selectedYear);

  const handleToggle = (value) => () => {
    console.log(checkedCountries);

    const currentIndex = checkedCountries.indexOf(value);
    const newCheckedCountries = [...checkedCountries];

    if (currentIndex === -1) {
      newCheckedCountries.push(value);
    } else {
      newCheckedCountries.splice(currentIndex, 1);
    }
    console.log(newCheckedCountries);
    setCheckedCountries(newCheckedCountries);
  };

  return (
    <>
      <Typography sx={{ mt: 4, mb: 2, width: 400 }} variant="h5" component="div">
        <strong>Countries:</strong> {checkedCountries.length} of {filteredData.length} selected
      </Typography>
      <div class="listWrapper">
        <ul>
          {filteredData.map((object) => (
            <li
              class="listItemWrapper"
              id={'List_' + object.country}
              onMouseEnter={(e) => {
                handleMouseEnter(e, ['Map_', 'Bubblechart_']);
                $(e.currentTarget).one('mouseleave', (e) => {
                  handleMouseLeave(e, ['Map_', 'Bubblechart_']);
                });
              }}
            >
              <div>
                <div class="flag">{object.flag}</div>
                <div class="text">
                  <div class="country">{object.country}</div>
                  <div class="patents">Patents: {object.patents}</div>
                </div>
                <div class="listCheckbox">
                  <input type="checkbox" onClick={handleToggle(object.country)}></input>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CountryList;
