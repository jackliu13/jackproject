import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ListGroup from 'react-bootstrap/ListGroup'
import Button from "react-bootstrap/Button";
import Figure from 'react-bootstrap/Figure';

import './ProjectProfile.css';

import ProjectOverview from './ProjectOverview.js';
import ProjectUsers from './ProjectUsers.js';
import ProjectUpdates from './ProjectUpdates.js';
import ManageProjectRecruit from './ManageProjectRecruit.js'

import BrowseProjectCollection from '../browse/project-card-collection.js';

import {isProjectOwner} from '../../services/user-project-verification.js';
import {BASE_URL} from '../../services/database-config.js';

export default class ProjectProfile extends React.Component {

  state = {
    items : [],
    users: [],
    selectedTab: "Overview"
  };


  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this)
    this.getUsers = this.getUsers.bind(this)
  }

  // reloadItemList = () => {
  // }

  changeTab = (tab) => {
    this.setState({
      selectedTab: tab
    })
  }

  componentDidMount(){

    const url = BASE_URL + "/api/project/select"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"

    },
    body: JSON.stringify({
      projectid: this.props.match.params.projectid
    })
    })
    promise.then(response=>response.json()).then(json=>{
      console.log(json.project)
      this.setState({
        items: json.project
      });
      console.log("full list", this.state.items)
    }).catch(error=>console.log(error));

    this.getUsers()

  }


  getUsers(){
    const url_users = BASE_URL + "/api/project/users"
    const promise_users = fetch(url_users,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"
    },
    body: JSON.stringify({
      projectid: this.props.match.params.projectid
    })
    })
    promise_users.then(response2=>response2.json()).then(json2=>{
      this.setState({
        users: json2.users
      });
    }).catch(error=>console.log(error));
  }





  render() {
    let tab = <h1> Error loading container... </h1>
    if (this.state.selectedTab === 'Overview'){
      tab = <ProjectOverview projectid={this.props.match.params.projectid} title={this.state.items.title} description={this.state.items.description} tags={this.state.items.tags} category={this.state.items.category} />
    }
    else if (this.state.selectedTab === 'People'){
      tab = <ProjectUsers users={this.state.users} />
    }
    else if (this.state.selectedTab === 'Updates'){
      tab = <ProjectUpdates updates={this.state.items.updates} owner={this.state.items.owner} projectid={this.props.match.params.projectid} />
    }
    else if (this.state.selectedTab === 'ManageProjectRecruit'){
      tab = <ManageProjectRecruit projectid={this.props.match.params.projectid}/>
    }



    return (
      <Container>
      <Row>
      <Col md={2}>
      <ListGroup variant="flush">
        <ListGroup.Item action onClick={() => {this.changeTab('Overview')}}>Overview</ListGroup.Item>
        <ListGroup.Item action onClick={() => {this.changeTab('Updates')}}>Updates</ListGroup.Item>
        <ListGroup.Item action onClick={() => {this.changeTab('People')}}>People</ListGroup.Item>
      </ListGroup>

      <br />
      {
        isProjectOwner(this.state.items.owner) ?
        <>
        <p><b> Manage Project </b></p>
        <ListGroup variant="flush">
          <ListGroup.Item action onClick={() => {this.changeTab('ManageProjectRecruit')}}>Recruit Users </ListGroup.Item>
          <ListGroup.Item action onClick={this.filter}>Dashboard</ListGroup.Item>
        </ListGroup>
        </>
        : null
      }

      </Col>
      <Col>
        {tab}
      </Col>
      </Row>
      </Container>
    )
}
}
