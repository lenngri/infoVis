import { useStoreState, useStoreActions } from 'easy-peasy';
import { styled } from '@mui/material/styles';
import { Container, Box, CircularProgress, Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { FixedSizeList } from 'react-window';
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

    setCheckedCountries(newCheckedCountries);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Countries: {checkedCountries.length} of {filteredData.length} selected
        </Typography>
        <Box sx={{ width: '60%', height: 1200, maxWidth: 360, bgcolor: 'background.paper' }}>
          <div class="listWrapper">
            <ul class="noBullets">
              {filteredData.map((object) => (
                <div
                  class="listItemWrapper"
                  id={'List_' + object.country}
                  onMouseEnter={(e) => handleMouseEnter(e, ['Map_', 'Bubblechart_'])}
                  onMouseLeave={(e) => handleMouseLeave(e, ['Map_', 'Bubblechart_'])}
                >
                  <li>
                    <div class="listItem">
                      <div class="flag">{object.flag}</div>
                      <div class="text">
                        <div class="country">{object.country}</div>
                        <div class="patents">Patents: {object.patents}</div>
                      </div>
                    </div>
                  </li>
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
