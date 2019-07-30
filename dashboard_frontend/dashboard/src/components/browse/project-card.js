import React, { Component } from "react";
import Card from 'react-bootstrap/Card'

export default class BrowseProjectCard extends Component {

  render () {
    return (
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{this.props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Project Subtitle</Card.Subtitle>
        <Card.Text>
          {this.props.description}
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
      </Card>
    )
  }

}
