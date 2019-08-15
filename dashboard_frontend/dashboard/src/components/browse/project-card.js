import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Redirect } from 'react-router-dom';

import ProjectCategoryBadges from '../group_components/ProjectCategoryBadges.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
        <div className="float-right">
        <span /><FontAwesomeIcon icon="arrow-right" className="arrowRight"/>
        </div>
        <Card.Title>
        {this.props.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
            <a href={PROJECT_URL}>Link to Project Page</a>
        </Card.Subtitle>
        <Card.Text>
          {this.props.description}
        </Card.Text>

      </Card.Body>
      <Card.Footer>
      <b>Category: </b> <ProjectCategoryBadges category={this.props.category} />
      </Card.Footer>
      </Card>
      </>
    )
  }

}
