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
    // this.setState({
    //   showModal: true,
    // });
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
    console.log(this.props.items)
    return (
      <>
      <Modal show={this.state.showModal} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.description}</Modal.Body>
      </Modal>

      <Card className="individual-card" onClick={() => this.props.onClick(this.props.id)}>
      <Card.Body>
        {items}
        <Card.Title>{this.props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
            Test Subtitle
        </Card.Subtitle>
        <Card.Text>
          {this.props.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
      {this.props.owner}
      </Card.Footer>
      </Card>
      </>
    )
  }

}
