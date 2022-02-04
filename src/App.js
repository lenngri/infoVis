import './components/App.css';
import { useStoreActions } from 'easy-peasy';
import { Grid, Container, Box, CircularProgress, Divider, Typography } from '@mui/material';
import Boxspacer from './components/Boxspacer';
import Appbar from './components/Appbar';
import Topcard from './components/Topcard';
import ChoroplethToggle from './components/ChoroplethToggle';
import TimeSlider from './components/TimeSlider';
import Impressum from './components/Impressum';
import Choropleth from './components/Choropleth/Choropleth';
import Bubblechart from './components/Bubblechart/Bubblechart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PieChart from './components/PieChart/PieChart';
import { useData } from './datatools/useData';
import { useMapData } from './datatools/useMapData';
import { usePatentCategoryData } from './datatools/usePatentCategoryData';
import CountryList from './components/CountryList/CountryList';

function App() {
  const setData = useStoreActions((actions) => actions.setData);
  const setMapData = useStoreActions((actions) => actions.setMapData);
  const setCategoryData = useStoreActions((actions) => actions.setCategoryData);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#151515',
      },
    },
  });

  const data = useData();
  const mapData = useMapData();
  const categoryData = usePatentCategoryData();
  console.log('Sucessfully loaded data.');

  if (!data || !mapData || !categoryData) {
    return (
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ mt: 50 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  setData(data);
  setMapData(mapData);
  setCategoryData(categoryData);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Appbar />
        <main>
          <Container sx={{ mt: 10 }}>
            <Topcard />
          </Container>
          <Boxspacer />
          <Grid container sx={{ align: 'center', justifyContent: 'center' }}>
            <Grid item xs="auto">
              <Box
                sx={{
                  // boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <CountryList />
              </Box>
            </Grid>
            <Grid item xs="auto">
              <Container>
                <Box
                  sx={{
                    // boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <ChoroplethToggle />
                  <Container>
                    <Choropleth />
                  </Container>
                  <TimeSlider />
                  <Boxspacer />
                  <Container>
                    <Bubblechart />
                  </Container>
                </Box>
              </Container>
            </Grid>
            <Grid item xs="auto">
              <Box
                sx={{
                  // boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <PieChart />
              </Box>
            </Grid>
          </Grid>
        </main>
        <footer className="Footer">
          <Divider />
          <Typography variant="h6" align="center" gutterBottom>
            Thanks for reading.
          </Typography>
          <Impressum />
          <Typography variant="subtitle1" align="center" color="textSecondard">
            This page is brought to you by MMT.
          </Typography>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
