import React from 'react';
import { Component } from 'react';
import Colorpleth from './components/Colorpleth';

class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Colorpleth />
        </header>
        <div>
        </div>
      </div>
    );

  }
}

export default App;
