import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Navigation from './components/navbar.js';
import Dashboard from './Dashboard.js'
import Login_Menu from './components/login/login_menu.js'





class App extends React.Component {
  render() {
    return (

      <BrowserRouter>
      <Route exact path = "/" render={(props) => <Dashboard{...props} message="Home"/>} />
      <Route exact path = "/login" render={(props) => <Login_Menu{...props}/>}/>
      </BrowserRouter>

    )



  }



}

export default App;
