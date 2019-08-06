import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './UserProfile.css';

export default class UserProfileProjects extends React.Component {

  state = {
    items : []
  };


  constructor(props) {
    super(props);
  }

  // reloadItemList = () => {
  // }




  render() {

    return (
      <Container>

      <Row>
      <Col md={2} className="sidebar">
      <h1><center> Project </center></h1>
      <p><center>Project subtitile</center></p>
      </Col>
      <Col>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="overview" title="Overview">
          <h1> Test </h1>
        </Tab>
        <Tab eventKey="projects" title="Projects">
          <h1> Test </h1>
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          <h1> Test </h1>
        </Tab>
      </Tabs>
      </Col>
      </Row>
      </Container>
    )
}
}
