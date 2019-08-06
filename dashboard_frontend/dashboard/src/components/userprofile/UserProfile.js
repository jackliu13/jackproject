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

export default class UserProfile extends React.Component {

  state = {
    items : []
  };


  constructor(props) {
    super(props);
  }

  // reloadItemList = () => {
  // }


  componentDidMount(){
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
      console.log(json.projects)
      this.setState({
        items: json.projects
      });
    }).catch(error=>console.log(error));
    this.setState({
      subtitle: "Browsing all projects that I have created..."
    })

  }

  render() {

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
      <h1>Jack Liu</h1>
      <p><b> 731 </b> Projects</p>

      <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar at arcu id finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean lacinia urna metus, eu vestibulum augue posuere quis. Vestibulum pretium, mauris ut pharetra mollis, dui lectus porttitor magna, ut dignissim sem nunc ut mi.

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
