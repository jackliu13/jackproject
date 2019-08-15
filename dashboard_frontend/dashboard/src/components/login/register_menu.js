import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Label from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ControlLabel from "react-bootstrap/FormControl";
import InputGroup from 'react-bootstrap/InputGroup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {isLoggedIn} from '../../services/logged-in.js';
import {BASE_URL} from '../../services/database-config.js'

import "./register_menu.css";

export default class Register_Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      realname: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.realname.length > 0 && this.state.username.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value
    });
  }

  handleSubmit = event => {
    console.log(this.state.fullname)
    event.preventDefault();
    const url = BASE_URL + "/api/register"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"

    },
    body: JSON.stringify({
      username : this.state.username,
      password : this.state.password,
      email: this.state.email,
      realname: this.state.realname

    })
    })
    promise.then(blob => blob.json()).then(json => {
    console.log(json)
    if(json.id !== undefined){
    window.sessionStorage.setItem("user_id", json.id)
    this.forceUpdate()
    }
    else{
      console.log("bad credentials")
    }
    }).catch(e=>{
      console.log("promise exception", e)
    })
    /* get api_key and save it in sessionStorage */
  }








  render() {
    if (isLoggedIn()){
      return <Redirect to="/home/browse" />
    }

    return (
      <div className="Register">

        <form onSubmit={this.handleSubmit}>
          <h1> Register </h1>
          <hr />
          <Form.Group controlId="username" bsSize="large">
            <Label>Username</Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                autoFocus
                id="username"
                placeholder="Enter your username..."
                value={this.state.username}
                onChange={this.handleChange}
              />
            </InputGroup>

          </Form.Group>
          <Form.Group controlId="fullname" bsSize="large">
            <Row>
            <Col>
            <Label>Full Name</Label>
            <FormControl
              autoFocus
              id="realname"
              placeholder="Enter your full name..."
              value={this.state.realname}
              onChange={this.handleChange}
            />
            </Col>
            <Col>
            <Label>Email</Label>
            <FormControl
              autoFocus
              id="email"
              type="email"
              placeholder="Enter your email..."
              value={this.state.email}
              onChange={this.handleChange}
            />
            </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Label>Password</Label>
            <FormControl
              placeholder="Enter a secure password..."
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              id="password"
            />
          </Form.Group>
          <center>
          <Button
            className="testbutton"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>
          <hr />
          <p>Already have an account? Login <b><a href="/home/login">here</a></b></p>
          </center>
        </form>
      </div>
    );
  }
}
