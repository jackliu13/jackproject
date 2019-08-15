import React from 'react';
import  { Redirect, Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'

import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';

import {isLoggedIn} from '../../services/logged-in.js';
import BrowseProjectCollection from './project-card-collection.js';
import './Browse.css'

import {BASE_URL} from '../../services/database-config.js'

export default class Browse extends React.Component {

  state = {
    items : [],
    subtitle : "Browse all projects from all users",
  };


  constructor(props) {
    super(props);


    this.filter = this.filter.bind(this)
    this.ownedBy = this.ownedBy.bind(this)
    this.browseAll = this.browseAll.bind(this)
    this.searchTag = this.searchTag.bind(this)
    this.searchCategory = this.searchCategory.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  // reloadItemList = () => {
  // }


  componentDidMount(){
    // const url = "http://127.0.0.1:5000/api/projects/all"
    const url = BASE_URL + "/api/projects/all"
    const promise = fetch(url)
    promise.then(response=>response.json()).then(json=>{
      this.setState({
        items: json.projects
      });
      console.log(json.projects)
    }).catch(error=>console.log(error));
  }

  browseAll(){
    // const url = BASE_URL + "/api/projects/all"
    const url = BASE_URL + "/api/projects/all"
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
    const url = BASE_URL + "/api/projects/fromuser"
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

  ownedBy(){
    const url = BASE_URL + "/api/projects/isOwner"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"
    },
    body: JSON.stringify({
      ownerid: window.sessionStorage.getItem('user_id')
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

  searchTag(){
    this.setState({
      showModal: true,
      modalToShow: "Tag"
    })
  }

  searchCategory(){
    this.setState({
      showModal: true,
      modalToShow: "Category"
    })
  }

  handleSubmit(){
    if (this.state.modalToShow === "Tag"){
      console.log(this.state.tagSearch)
      const url = BASE_URL + "/api/projects/search/tag"
      const promise = fetch(url,{
      method: "post",
      mode: "cors",
      headers:{
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        tag: this.state.tagSearch
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
        subtitle: "Browsing all projects based on tag: [ " + this.state.tagSearch + " ]"
      })
    }
    else if (this.state.modalToShow === "Category"){
      console.log(this.state.tagSearch)
      const url = BASE_URL + "/api/projects/search/category"
      const promise = fetch(url,{
      method: "post",
      mode: "cors",
      headers:{
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        category: this.state.categorySearch
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
        subtitle: "Browsing all projects based on category: [ " + this.state.categorySearch + " ]"
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id] : event.target.value
    })
  }

  hideModal(){
    this.setState({
      showModal: false
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
      <>
      <Modal show={this.state.showModal} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Search by {this.state.modalToShow}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {
            this.state.modalToShow === 'Tag' ?
            <form onSubmit={this.handleSubmit}>
              <Form.Group>
                <FormControl
                  placeholder="Enter the tag you are searching for.."
                  id="tagSearch"
                  value={this.state.tagSearch}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <center>
                <Button block type="button" onClick={() => this.handleSubmit()}>Search</Button>
              </center>
            </form>
            :
            <form onSubmit={this.handleSubmit}>
              <Form.Group>
              <Form.Control as="select" id="categorySearch" onChange={this.handleChange}>
                <option disabled selected value> -- select an option -- </option>
                <option>Tech</option>
                <option>Art</option>
                <option>Business</option>
                <option>Crafts</option>
                <option>Video & Animation</option>
                <option>Writing</option>
                <option>Other</option>
              </Form.Control>
              </Form.Group>

              <center>
                <Button block type="button" onClick={() => this.handleSubmit()}>Search</Button>
              </center>
            </form>
          }

          </Modal.Body>
      </Modal>

      <div className="BrowsePage">
      <Row>
      <Col md={2} className="sidebar">
      <button className="browseAll" onClick={this.browseAll}><p>All Projects</p></button>
      <p><b> Search </b></p>
      <ListGroup variant="flush">
        <ListGroup.Item action onClick={this.searchTag}>Search by Tag</ListGroup.Item>
        <ListGroup.Item action onClick={this.searchCategory}>Search by Category</ListGroup.Item>
      </ListGroup>
      <br />
      {
        isLoggedIn() ?
        <>
        <p><b> Private </b></p>
        <ListGroup variant="flush">
          <ListGroup.Item  action onClick={this.filter}>Projects that I contributed to </ListGroup.Item>
          <ListGroup.Item action onClick={this.ownedBy}>My Projects</ListGroup.Item>
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
      </>
    )
}
}
