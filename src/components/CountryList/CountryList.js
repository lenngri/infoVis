import { useStoreState, useStoreActions } from 'easy-peasy';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import Typography from '@mui/material/Typography';

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

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const list = filteredData.map((object) => {
    const labelId = `checkbox-list-secondary-label-${object.country}`;

    return (
      <ListItem>
        <ListItemIcon>{object.flag}</ListItemIcon>
        <ListItemText primary={object.country} secondary={`Patents: ${object.patents}`} />
        <Checkbox
          edge="end"
          onChange={handleToggle(object)}
          checked={checkedCountries.indexOf(object) !== -1}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItem>
    );
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          countries
        </Typography>
        <Demo>
          <List>{list}</List>
        </Demo>
      </Grid>
    </Grid>
  );
};

export default CountryList;
