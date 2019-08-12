import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Figure from 'react-bootstrap/Figure'

export default class Landing extends React.Component {

  state = {
  };


  constructor(props) {
    super(props);
  }

  // reloadItemList = () => {
  // }


  componentDidMount(){
  }


  render() {
    console.log("user",this.state.items)

    return (
      <Container>
      <Row>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      </Row>
      <Row>
      <Col md={6}>
      <b>
      <h1> Collaborate on <u>awesome</u> projects with <i>diverse</i> skillsets </h1>
      </b>
      <p> [...] is a platform to upload projects</p>

      </Col>

      </Row>

      </Container>
    )
}
}
