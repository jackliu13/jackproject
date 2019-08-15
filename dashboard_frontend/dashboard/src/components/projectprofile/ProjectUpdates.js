import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import ProjectUpdateCard from './ProjectUpdateCard';

import './ProjectUpdates.css'

import {isProjectOwner} from '../../services/user-project-verification.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {BASE_URL} from '../../services/database-config.js';

export default class ProjectUpdates extends React.Component {

  state = {
  };


  constructor(props) {
    super(props);

    this.hideModal = this.hideModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id] : event.target.value
    })
  }

  hideModal(){
    this.setState({
      showModal: false
    })
  }

  handleClick(){
    this.setState({
      showModal: true,
    })
  }
  handleSubmit(){
    const url = BASE_URL + "/api/project/modify"
    const promise = fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        projectid: this.props.projectid,
        updates: this.state.update
      })
    });
    promise.then(response=>response.json()).then(json=>{
      this.forceUpdate()
      this.setState({
        showModal: false
      })
    }).catch(error=>console.log(error));
  }




  render() {

    if (!(this.props.updates)){
      return (
        <>
        <Modal show={this.state.showModal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Post an update {this.state.modalToShow}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <FormControl
                    as="textarea" rows="10"
                    placeholder="Enter a quick update"
                    id="update"
                    value={this.state.update}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <center>
                  <Button block type="button" onClick={() => this.handleSubmit()}>Post</Button>
                </center>
              </form>
            </Modal.Body>
        </Modal>

        <Row>
        <Col>
        <h3> Project Updates </h3>
        </Col>

        {
          isProjectOwner(this.props.owner) ?
          <Button onClick={() => this.handleClick()}><FontAwesomeIcon icon="plus" /> </Button>
          :
          null
        }
        </Row>
        <hr />
        <p><b>There are no current updates posted</b></p>
        </>
      )
    }
    const items = this.props.updates.map((update)=>
        <>
        <ProjectUpdateCard message={update} />
        <br />
        </>
    )

    return (
      <>
      <Modal show={this.state.showModal} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Post an update {this.state.modalToShow}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <Form.Group>
                <FormControl
                  as="textarea" rows="10"
                  placeholder="Enter a quick update"
                  id="update"
                  value={this.state.update}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <center>
                <Button block type="button" onClick={() => this.handleSubmit()}>Post</Button>
              </center>
            </form>
          </Modal.Body>
      </Modal>

      <Row>
      <Col>
      <h3> Project Updates </h3>
      </Col>

      {
        isProjectOwner(this.props.owner) ?
        <Button onClick={() => this.handleClick()}><FontAwesomeIcon icon="plus" /> </Button>
        :
        null
      }
      </Row>
      <hr />
      {items}
      </>
    )
}
}
