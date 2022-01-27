import './components/App.css';
import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Container, Box, CircularProgress, Divider, Typography, Switch } from '@mui/material';
import Boxspacer from './components/Boxspacer';
import Appbar from './components/Appbar';
import Topcard from './components/Topcard';
import ChoroplethToggle from './components/ChoroplethToggle';
import TimeSlider from './components/TimeSlider';
import Impressum from './components/Impressum';
import Choropleth from './components/Choropleth/Choropleth';
import Bubblechart from './components/Bubblechart/Bubblechart';
import Tooltips from './components/Tooltips';
import { useData } from './datatools/useData';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const setData = useStoreActions((actions) => actions.setData);

  const [darkMode, setDarkMode] = useState(false);

  const Theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const data = useData();
  console.log('Sucessfully loaded data.');

  if (!data) {
    return (
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ mt: 50 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  setData(data);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Appbar />
        <main>
          <Boxspacer />
          <Boxspacer />
          <Boxspacer />
          <Boxspacer />
          <Boxspacer />
          <Container>
            <Topcard />
          </Container>
          <Boxspacer />
          <Container>
            <ChoroplethToggle />
            <Tooltips />
            <Container>
              <Box
                sx={{
                  // boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Choropleth />
              </Box>
            </Container>
            <TimeSlider />
            <Boxspacer />
            <Container>
              <Box
                sx={{
                  // boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  mb: 6,
                }}
              >
                <Bubblechart />
              </Box>
            </Container>
          </Container>
        </main>
        <footer className="Footer">
          <Divider />
          <Typography variant="h6" align="center" gutterBottom>
            Thanks for reading.
          </Typography>
          <Impressum />
          <Typography variant="subtitle1" align="center" color="textSecondary">
            This page is brought to you by MMT.
          </Typography>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
