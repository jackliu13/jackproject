import React from 'react';

import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom';

import Navigation from './components/navbar.js';
import Home from './Home.js'
import Login_Menu from './components/login/login_menu.js'





class App extends React.Component {
  render() {
    return (

      <BrowserRouter>
      <Route exact path = "/" render={(props) => <Redirect to='/home' />} />
      <Route path = "/home" render={(props) => <Home{...props}/>}/>
      </BrowserRouter>

    )



  }



}

export default App;
// <Route exact path = "/login" render={(props) => <Login_Menu{...props}/>}/>
