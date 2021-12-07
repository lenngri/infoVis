import React from 'react';
import { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount(){
    this.getData()
  }

  getData(){
    const conn = new XMLHttpRequest();
    const url = "http://84.252.122.16:3000";
    // conn.addEventListener('load', () => {
    //   console.log(conn.responseText)
    // })
    conn.open("GET", url + "/rpc/proximity_search_inv?latitude=45.436699&longitude=12.320233&dist =3000")
    conn.send()
    conn.onreadystatechange = (e) => {
      console.log(conn.responseText)
    }
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          Hello World!
        </header>
        <div>
        </div>
      </div>
    );

  }
}

export default App;
