import './components/App.css';
import { Divider, Container, Typography } from '@material-ui/core';
import Boxspacer from './components/Boxspacer';
import Appbar from './components/Appbar';
import Topcard from './components/Topcard';
import Containera from './components/Containera';
import Tabsa from './components/Tabsa';
// import Slider from './components/Slider';
import Colormode from './components/Colormode';
import Impressum from './components/Impressum';
import Choropleth from './components/Choropleth/Choropleth';

function App() {
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
          <Tabsa />
          <Choropleth />
          <Boxspacer />
          <Containera />
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
