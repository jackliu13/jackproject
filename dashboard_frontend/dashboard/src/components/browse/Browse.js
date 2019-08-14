import React from 'react';
import  { Redirect, Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'

import {isLoggedIn} from '../../services/logged-in.js';
import BrowseProjectCollection from './project-card-collection.js';
import './Browse.css'

export default class Browse extends React.Component {

  state = {
    items : [],
    subtitle : "Browse all projects from all users",
  };


  constructor(props) {
    super(props);


    this.filter = this.filter.bind(this)
    this.browseAll = this.browseAll.bind(this)
  }

  // reloadItemList = () => {
  // }


  componentDidMount(){
    const url = "http://127.0.0.1:5000/api/projects/all"
    const promise = fetch(url)
    promise.then(response=>response.json()).then(json=>{
      this.setState({
        items: json.projects
      });
      console.log(json.projects)
    }).catch(error=>console.log(error));
  }

  browseAll(){
    const url = "http://127.0.0.1:5000/api/projects/all"
    const promise = fetch(url)
    promise.then(response=>response.json()).then(json=>{
      this.setState({
        items: json.projects
      });
      console.log(json.projects)
    }).catch(error=>console.log(error));
    this.setState({
      subtitle: "Browse all projects from all users"
    })
  }

  filter(){
    const url = "http://127.0.0.1:5000/api/projects/fromuser"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"

    },
    body: JSON.stringify({
      userid: window.sessionStorage.getItem('user_id')
    })
    })
    promise.then(response=>response.json()).then(json=>{
      console.log("data",json.projects)
      this.setState({
        items: json.projects
      });
      console.log(this.state.items)
    }).catch(error=>console.log(error));
    this.setState({
      subtitle: "Browsing all projects that I have created..."
    })
  }


  render() {
    if (this.state.redirect_to_project){
      console.log(this.state.redirect_to_project)
      return (
        <Link to={this.state.redirect_to_project} />
      )
    }

    return (
      <div className="BrowsePage">
      <Row>
      <Col md={2} className="sidebar">
      <button className="browseAll" onClick={this.browseAll}><p>All Projects</p></button>
      <p><b> Search </b></p>
      <ListGroup variant="flush">
        <ListGroup.Item>Most popular tags</ListGroup.Item>
        <ListGroup.Item>Search by position</ListGroup.Item>
      </ListGroup>
      <br />
      {
        isLoggedIn() ?
        <>
        <p><b> Private </b></p>
        <ListGroup variant="flush">
          <ListGroup.Item>All My Projects </ListGroup.Item>
          <ListGroup.Item action onClick={this.filter}>Projects I Created</ListGroup.Item>
        </ListGroup>
        </>
        : null
      }

      </Col>

      <Col>
      <h1>Browse Projects</h1>
      <p>{this.state.subtitle}</p>
      <hr />
      <BrowseProjectCollection items={this.state.items} />
      </Col>
      </Row>

      </div>
    )
}
}
