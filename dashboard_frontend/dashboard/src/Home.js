import React from 'react';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import './App.css';
import HomeNav from './components/home_navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Login_Menu from './components/login/login_menu.js'
import Browse from './components/browse/Browse.js'


class Home extends React.Component {
  render() {
    return (

      <div className="Home">
        <HomeNav />
        <div>
        <BrowserRouter>
        <Route path = "/home/browse" render={(props) => <Browse{...props}/>}/>
        <Route path = "/home/login" render={(props) => <Login_Menu{...props}/>}/>
        </BrowserRouter>
        </div>
      </div>
    )



  }



}

export default Home;
