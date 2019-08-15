import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Figure from 'react-bootstrap/Figure'

import './UserProfile.css';

import UserProfileProjects from './User-Profile-Projects.js'
import BrowseProjectCollection from '../browse/project-card-collection.js';

import {BASE_URL} from '../../services/database-config.js';

export default class UserProfile extends React.Component {

  state = {
    items : [],
    userinfo: ""
  };


  constructor(props) {
    super(props);
    this.findUserInfo = this.findUserInfo.bind(this)
  }

  // reloadItemList = () => {
  // }


  componentDidMount(){
    this.findUserInfo()
    const url = BASE_URL + "/api/projects/fromuser"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"
    },
    body: JSON.stringify({
      userid: this.props.match.params.userid
    })
    })
    promise.then(response=>response.json()).then(json=>{
      console.log(json.projects)
      this.setState({
        items: json.projects
      });
    }).catch(error=>console.log(error));
    this.setState({
      subtitle: "Browsing all projects that I have created..."
    })
  }


  findUserInfo(){
    const url = BASE_URL + "/api/user"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"
    },
    body: JSON.stringify({
      userid: this.props.match.params.userid
    })
    })
    promise.then(response=>response.json()).then(json=>{
      this.setState({
        userinfo: json.user
      });
    }).catch(error=>console.log(error));
  }

  render() {
    console.log("user",this.state.items)

    return (
      <Container>
      <Row>
      <Col md={3}>
      <div className="profile-sidebar">
      <Figure>
        <Figure.Image
          className="profileImage"
          width={171}
          height={180}
          alt="171x180"
          src="https://icon-library.net/images/default-user-icon/default-user-icon-8.jpg"
        />
      </Figure>
      <h1>{this.state.userinfo.realname}</h1>

      <div>
      <b>Bio</b>
      <br />
      No Description
      <br />
      <br />
      <b>Location: </b>
      <br />
      New York City, NY

      </div>
      </div>
      </Col>
      <Col>
          <Container>
            <Row>
            <h3> Overview </h3>
            </Row>
            <Row>
              <h3> Projects </h3>
              <BrowseProjectCollection items={this.state.items}/>

            </Row>
          </Container>
      </Col>
      </Row>
      </Container>
    )
}
}
