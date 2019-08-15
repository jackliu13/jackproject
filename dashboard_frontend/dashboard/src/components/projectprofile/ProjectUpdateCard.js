import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';

import './ProjectUpdates.css'


export default class ProjectUpdateCard extends React.Component {

  state = {
  };


  constructor(props) {
    super(props);
  }


  render() {

    return (
      <Card className="update-card">
      <Card.Body className="individual-card-body">
        <Card.Text>
          {this.props.message}
        </Card.Text>

      </Card.Body>
      </Card>
    )
}
}
