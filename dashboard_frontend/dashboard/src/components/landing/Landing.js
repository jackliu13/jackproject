import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Figure from 'react-bootstrap/Figure';
import Image from 'react-bootstrap/Image';

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

        // <Image src="/assets/main_logo_image2.png" rounded fluid />


  render() {
    console.log("user",this.state.items)

    return (
      <Container>
      <Row>
      <br /><br /><br /><br /><br /><br />

      </Row>
      <Row>
      <Col md={6}>

      <b>
      <h1> Collaborate on <u>awesome</u> projects with <i>diverse</i> skillsets </h1>
      </b>
      <p> [...] is a platform to upload and share side projects and find others who are just
      as passionate as you to collaborate with. Find artists, designers, programmers, testers,
      and more here.
      </p>
      <hr />
      <br /><br />
      </Col>

      <center>
      <Figure>
        <Figure.Image
          className="profileImage"
          width={230}
          height={230}
          alt="180x180"
          src="/assets/main_logo_image2.png"
        />
      </Figure>
      </center>
      
      </Row>


      </Container>
    )
}
}
