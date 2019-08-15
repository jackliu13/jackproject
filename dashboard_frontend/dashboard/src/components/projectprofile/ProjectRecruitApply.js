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

import {BASE_URL} from '../../services/database-config.js';


export default class ProjectRecruitApply extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message : ""
    };
  }

  validateForm() {
    return this.state.message.length > 0;
  }

  handleChange = event => {
    console.log(event.target.type, event.target.value)
    this.setState({
      [event.target.id] : event.target.value
    });
  }

  handleSubmit = event => {
    const url = BASE_URL + "/api/recruit/create-recruit-request"
    const promise = fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        recruitid: this.props.recruitid,
        userid: window.sessionStorage.getItem('user_id'),
        message: this.state.message,
        status: "Pending"
      })
    });
  }

  render() {

    return (
      <div className="NewRecruitApplyForm">
        <form onSubmit={this.handleSubmit}>

          <Form.Group>
            <FormControl
              as="textarea" rows="6"
              placeholder="Enter a quick message regarding "
              id="message"
              value={this.state.message}
              onChange={this.handleChange}
            />
          </Form.Group>
          <hr />
          <center>
          <Button
            block
            disabled={!this.validateForm()}
            type="button"
            onClick={() => this.handleSubmit()}
          >
            Submit
          </Button>
          </center>

        </form>
      </div>
    );
}
}
