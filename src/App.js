import './components/App.css';
import { useState } from 'react';
import { Divider, Container, Typography } from '@material-ui/core';
import Boxspacer from './components/Boxspacer';
import Appbar from './components/Appbar';
import Topcard from './components/Topcard';
import Containera from './components/Containera';
import Tabsa from './components/Tabsa';
import TimeSlider from './components/TimeSlider';
import Colormode from './components/Colormode';
import Impressum from './components/Impressum';
import Choropleth from './components/Choropleth/Choropleth';
import Bubblechart from './components/Bubblechart/Bubblechart';

function App() {
  const [year, setYear] = useState(2011);
  const [view, setView] = useState(0);

  return (
    <div className="App">
      <Appbar />
      <Colormode />
      <main>
        <Boxspacer />
        <Container>
          <Topcard />
        </Container>
        <Boxspacer />
        <Container>
          <Tabsa view={view} setView={setView} />
          <Choropleth view={view} selectedYear={year} />
          <TimeSlider setYear={setYear} />
          <Boxspacer />
          <Bubblechart selectedYear={year} />
        </Container>
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
  );
}

export default App;
