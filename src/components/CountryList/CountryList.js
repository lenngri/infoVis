import { useStoreState, useStoreActions } from 'easy-peasy';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { handleMouseEnter, handleMouseLeave } from '../../charttools/useMouseHover';

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
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2, width: 400 }} variant="h5" component="div">
          <strong>Countries:</strong> {checkedCountries.length} of {filteredData.length} selected
        </Typography>
        <Box sx={{ width: '60%', height: 1200, maxWidth: 360, bgcolor: 'background.paper' }}>
          <div class="listWrapper">
            <ul class="noBullets">
              {filteredData.map((object) => (
                <div class="listHighlightWrapper" id={'List_' + object.country}>
                  <div
                    id={'Item_' + object.country}
                    class="listItemWrapper"
                    onMouseEnter={(e) => handleMouseEnter(e, ['Map_', 'Bubblechart_', 'List_'])}
                    onMouseLeave={(e) => handleMouseLeave(e, ['Map_', 'Bubblechart_', 'List_'])}
                  >
                    <li>
                      <div class="listItem">
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
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CountryList;
