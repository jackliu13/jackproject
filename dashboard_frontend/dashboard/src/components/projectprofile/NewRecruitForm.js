import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Label from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ControlLabel from "react-bootstrap/FormControl";

import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';


export default class NewRecruitForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      role: "",
      description: "",
    };
  }

  validateForm() {
    return this.state.role.length > 0 && this.state.description.length > 0;
  }

  handleChange = event => {
    console.log(event.target.type, event.target.value)
    this.setState({
      [event.target.id] : event.target.value
    });
  }

  handleSubmit = event => {
    const url = "http://127.0.0.1:5000/api/recruit/create-recruit"
    const promise = fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        projectid: this.props.projectid,
        role: this.state.role,
        description: this.state.description,
      })
    });
  }

  render() {

    return (
      <div className="NewRecruitForm">
        <form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Label>Role</Label>
            <FormControl
              autoFocus
              id="role"
              placeholder="Ex. Designer, Programmer, etc"
              value={this.state.role}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              Make your project title short & concise
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Label>Role Description</Label>
            <FormControl
              as="textarea" rows="6"
              placeholder="Enter a quick description of what this role entails"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            // <Form.Text className="text-muted">
            //   This description is a <b>brief</b> explanation about your project. You can add more later.
            // </Form.Text>
          </Form.Group>
          <hr />
          <center>
          <Button
            block
            disabled={!this.validateForm()}
            type="button"
            onClick={() => this.handleSubmit()}
          >
            Add
          </Button>
          </center>

        </form>
      </div>
    );
}
}
