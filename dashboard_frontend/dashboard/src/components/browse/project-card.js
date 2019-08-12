import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal'


import './project-card.css'

export default class BrowseProjectCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.hideModal = this.hideModal.bind(this)
  }

  handleClick = event => {
    this.setState({
      showModal: true,
    });
  }

  hideModal(){
    this.setState({
      showModal: false,
    });
  }

  render () {
    let items = []
    if (this.props.tags != null){
      items = this.props.tags.map((item)=>
          <span>
          <Badge variant="secondary">
              {item}
          </Badge>
          <span> </span>
          </span>
      )
    }

    let PROJECT_URL = "/home/project/" + this.props.id;

    return (
      <>
      <Modal show={this.state.showModal} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.description}</Modal.Body>
      </Modal>

      <Card className="individual-card" onClick={() => this.handleClick()}>
      <Card.Body className="individual-card-body">
        {items}
        <Card.Title>{this.props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
            <a href={PROJECT_URL}>Link to Project Page</a>
        </Card.Subtitle>
        <Card.Text>
          {this.props.description}
        </Card.Text>

      </Card.Body>
      <Card.Footer>
      </Card.Footer>
      </Card>
      </>
    )
  }

}
