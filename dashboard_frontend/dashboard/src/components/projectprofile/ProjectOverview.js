import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';

import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'

import ProjectRecruit from './ProjectRecruit.js';

import './ProjectOverview.css';

export default class ProjectOverview extends React.Component {

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



  render() {

    let tags = []
    if (this.props.tags != null){
      tags = this.props.tags.map((item)=>
          <span>
          <Badge variant="secondary">
              {item}
          </Badge>
          <span> </span>
          </span>
      )
    }
    else {
      tags = ['None']
    }

    return (
      <>
      <Modal dialogClassName="project_recruit_modal" show={this.state.showModal} onHide={this.hideModal} size="lg">
        <Modal.Header closeButton>
          <div>
          <h3> Become apart of the project </h3>
          <p><i>Here are the available roles for this project</i></p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <ProjectRecruit />
        </Modal.Body>
      </Modal>


      <h1> {this.props.title}</h1>
      <div>
      <b>Project Description: </b>
      <br />
      {this.props.description}
      <br />
      <br />
      <b>Tags: </b>
      <br />
      {tags}
      <br />
      <br />
      <b>Location: </b>
      <br />
      New York City, NY
      </div>
      <hr />
      <Row className="project-overview_button-row">
      <Col>
      <center>
      <Button className="joinProject" block type="button" onClick={() => this.handleClick()}> Request to join the Project</Button>
      <br />
      <h3><b>OR</b></h3>
      <br />
      <Button className="followProject" block type="button"> Follow Project</Button>
      </center>
      </Col>
      </Row>
      </>
    )

  }

}
