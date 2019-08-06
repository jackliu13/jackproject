import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Label from "react-bootstrap/Form";
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
      [event.target.id] : event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const url = "http://127.0.0.1:5000/api/login"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"

    },
    body: JSON.stringify({
      username : this.state.email,
      password : this.state.password
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
    return (
      <div className="Login">

        <form onSubmit={this.handleSubmit}>
          <h1> Login </h1>
          <hr />
          <Form.Group controlId="email" bsSize="large">
            <Label>Email</Label>
            <FormControl
              autoFocus
              id="email"
              placeholder="Enter your email..."
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Label>Password</Label>
            <FormControl
              placeholder="Enter your password..."
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
            Login
          </Button>
          <hr />
          <p>Need an account? Sign up <b>here</b></p>
          </center>
        </form>
      </div>
    );
  }
}
