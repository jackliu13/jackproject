import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import "./home_navbar.css";

export default function Home_Nav(props){

  return (
<nav className="navbar navbar-expand-md navbar-light bg-transparent">
    <button className="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbar">
        <span className="navbar-toggler-icon"></span>
    </button>
    <a href="/home" className="navbar-brand d-flex w-50 mr-auto">Name</a>
    <div className="navbar-collapse collapse w-100" id="navbar">
        <ul className="navbar-nav w-100 justify-content-center d-flex flex-fill">
            <li className="nav-item">
                <a className="nav-link" href="/home/browse">Browse</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Upload</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
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
