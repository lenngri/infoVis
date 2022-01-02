import React from 'react';
import { Component } from 'react';
import Colorpleth from './components/Choropleth/Choropleth';

class App extends Component {
  render(){
    return (
      <div className="App">
        <h1 className='center'>Patent Power Visualized</h1>
        <Colorpleth />
      </div>
    );

  }
}

export default App;
