import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyEditor from './components/basic_doc.js'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <h1> Editor works?</h1>

        <MyEditor />
      </div>
    )



  }



}

export default App;
