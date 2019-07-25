import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Label from "react-bootstrap/Form";
import Input from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ControlLabel from "react-bootstrap/FormControl";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./login_menu.css";

export default class Login_Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <Container className="Login_Menu">
              <h2>Sign In</h2>
              <Form className="form">
                <Col>
                  <FormGroup>
                    <Label>Email</Label>
                    <Form.Control
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="myemail@email.com"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Form.Control
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="********"
                    />
                  </FormGroup>
                </Col>
                <Button>Submit</Button>
              </Form>
            </Container>
    );
  }
}
