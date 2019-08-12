import React from 'react';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import HomeNav from './components/home_navbar.js';

import Login_Menu from './components/login/login_menu.js'
import Browse from './components/browse/Browse.js'
import UploadProject from './components/uploadproject/UploadProject.js'
import UserProfile from './components/userprofile/UserProfile.js'
import ProjectProfile from './components/projectprofile/ProjectProfile.js'
import Landing from './components/landing/Landing.js'


class Home extends React.Component {
  render() {
    return (

      <div className="Home">
        <HomeNav />
        <div>
        <BrowserRouter>
        <Route exact path = "/home" render={(props) => <Landing{...props}/>}/>
        <Route path = "/home/browse" render={(props) => <Browse{...props}/>}/>
        <Route path = "/home/login" render={(props) => <Login_Menu{...props}/>}/>
        <Route path = "/home/upload" render={(props) => <UploadProject{...props}/>}/>
        <Route path = "/home/profile/:userid" render={(props) => <UserProfile{...props}/>}/>
        <Route path = "/home/project/:projectid" render={(props) => <ProjectProfile{...props}/>}/>
        </BrowserRouter>
        </div>
      </div>
    )



  }



}

export default Home;
