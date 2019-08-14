import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "./home_navbar.css";
import {isLoggedIn} from '../services/logged-in.js';


import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import NavDropdown from './home_navbar_dropdown.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




export default class Home_Nav extends React.Component{


  handleClick = event => {
    window.sessionStorage.clear()
  }

  render(){

    if (isLoggedIn()){
      console.log("logged in")
      const profileURL = "/home/profile/" + window.sessionStorage.getItem('user_id')
      return (
        <nav className="navbar navbar-expand-md navbar-light bg-transparent">
            <button className="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a href="/home" className="navbar-brand d-flex w-50 mr-auto">

              <FontAwesomeIcon icon="puzzle-piece" className="icon-logo" size="lg" />
              <div className="text-logo">Jigsaw</div>
            </a>
            <div className="navbar-collapse collapse w-100" id="navbar">
                <ul className="navbar-nav w-100 justify-content-center d-flex flex-fill">
                    <li className="nav-item">
                        <a className="nav-link individual-link" href="/home/browse">Browse</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link individual-link" href="/home/upload">Upload</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link individual-link" href="/home/profile">Profile</a>
                    </li>
                </ul>
                <ul className="navbar-nav w-100 justify-content-end d-flex">
                <NavDropdown name="Second user">
                  <div className="dropdown-header"> Test</div>

                   <a className="dropdown-item" href={profileURL}>Profile</a>
                   <a className="dropdown-item" href="/">Projects</a>
                   <div className="dropdown-divider"></div>
                   <a className="dropdown-item" href="/home" onClick={() => this.handleClick()}>Logout</a>

                 </NavDropdown>

                </ul>
            </div>
            <div className="d-flex flex-fill"> </div>
        </nav>
      )

    }
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-transparent">
            <button className="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a href="/home" className="navbar-brand d-flex w-50 mr-auto">

              <FontAwesomeIcon icon="puzzle-piece" className="icon-logo" size="lg" />
              <div className="text-logo">Jigsaw</div>
            </a>
            <div className="navbar-collapse collapse w-100" id="navbar">
                <ul className="navbar-nav w-100 justify-content-center d-flex flex-fill">
                    <li className="nav-item">
                        <a className="nav-link individual-link" href="/home/browse">Browse</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link individual-link" href="/home/upload">Upload</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link individual-link" href="/home/profile">Profile</a>
                    </li>
                </ul>
                <ul className="navbar-nav w-100 justify-content-end d-flex">
                    <li className="nav-item">
                        <a className="nav-link-login" id="navbar-link-id" href="/home/login"> Login</a>
                    </li>
                </ul>
            </div>
            <div className="d-flex flex-fill"> </div>
        </nav>
  )

  }

}
