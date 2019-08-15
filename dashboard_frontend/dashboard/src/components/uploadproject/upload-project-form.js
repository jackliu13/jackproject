import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Label from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ControlLabel from "react-bootstrap/FormControl";
import Toast from 'react-bootstrap/Toast'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./upload-project-form.css";


import TagInput from "./upload-project-form-tags.js";
import ProjectCategoryBadges from '../group_components/ProjectCategoryBadges.js'
import {BASE_URL} from '../../services/database-config.js';

export default class UploadProjectForm extends Component {
  constructor(props) {
    super(props);
    this.toggleShowToast = this.toggleShowToast.bind(this)

    this.state = {
      title: "",
      description: "",
      tags: [],
      selected_category: "",
      showToast: false
    };
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.description.length > 0;
  }

  handleChange = event => {
    console.log(event.target.type, event.target.value)
    this.setState({
      [event.target.id] : event.target.value
    });
  }

  handleCategoryChange = event => {
    this.setState({
      selected_category : event.target.value
    });
  }

  backwardsCategoryChange = event => {
    this.setState({
      selected_category: ""
    });
  }

  handleSubmit = event => {
    const url = BASE_URL + "/api/projects/create-project"
    console.log(this.state.title, this.state.description)
    const promise = fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        tags: this.state.tags,
        owner: window.sessionStorage.getItem('user_id'),
        category: this.state.selected_category
      })
    });
    promise.then(this.toggleShowToast())
  }

  updateTags = (tags) => {
    this.setState({
      tags: tags
    })
  }


  toggleShowToast(){
    this.setState(prevState => ({
      showToast: !(prevState.showToast)
    }));
    console.log(this.state.showToast)
  }

  render() {
    return (
      <div className="UploadProjectForm">
      <Toast className="position-absolute upload-success" show={this.state.showToast} onClose={this.toggleShowToast}>
        <Toast.Header>
          <strong className="mr-auto">Project Added</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>
        You have successfully submitted your project! Click <b><a href="/home/browse">here</a></b> to browse all projects
        </Toast.Body>
      </Toast>
        <form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Row>
            <Col>
            <Label>Project Title</Label>
            <FormControl
              autoFocus
              id="title"
              placeholder="Enter your project title..."
              value={this.state.title}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              Make your project title short & concise
            </Form.Text>
            </Col>
            <Col>

            {
              (this.state.selected_category) ?

              <Row className="category-selected">
              <h3 className="category-label-selected">Selected Category: </h3>
              <ProjectCategoryBadges className="categoryBadge" category={this.state.selected_category} onClick={this.backwardsCategoryChange}/>
              </Row>
              :
              <>
              <Label>Project Category</Label>
              <Form.Control as="select" onChange={this.handleCategoryChange}>
                <option disabled selected value> -- select an option -- </option>
                <option>Tech</option>
                <option>Art</option>
                <option>Business</option>
                <option>Crafts</option>
                <option>Video & Animation</option>
                <option>Other</option>
              </Form.Control>
              <Form.Text className="text-muted">
                Select an appropriate category for your project
              </Form.Text>
              </>
            }



            </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Label>Project Description</Label>
            <FormControl
              as="textarea" rows="3"
              placeholder="Enter a quick description of your project..."
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              This description is a <b>brief</b> explanation about your project. You can add more later.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Label>Project Tags -<i> Optional</i></Label>
            <TagInput updateTags={this.updateTags} />
          </Form.Group>
          <hr />
          <center>
          <Button
            block
            disabled={!this.validateForm()}
            type="button"
            onClick={() => this.handleSubmit()}
          >
            Upload
          </Button>
          </center>

        </form>
      </div>
    );
  }
}
