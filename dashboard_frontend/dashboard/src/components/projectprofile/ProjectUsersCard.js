import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';



export default class ProjectUsersCard extends React.Component {

  state = {
  };


  constructor(props) {
    super(props);
  }


  render() {
    let USER_PAGE = "/home/profile/" + this.props.id

    return (
      <>
      <Container>
      <Row>
      <Col md={2} className="sidebar">
      <h3><center> {this.props.realname}</center></h3>
      <a href={USER_PAGE}><center>Link to user page</center></a>
      </Col>
      <Col>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="overview" title="Overview">
          <h1> Test </h1>
        </Tab>
        <Tab eventKey="projects" title="Contributions">
          <h1> Test </h1>
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          <h1> Test </h1>
        </Tab>
      </Tabs>
      </Col>
      </Row>
      </Container>
      <br /><br />
      </>
    )
}
}
