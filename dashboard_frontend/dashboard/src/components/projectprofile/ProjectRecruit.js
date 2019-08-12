import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table'

import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';


export default class ProjectRecruit extends React.Component {

  state = {
  };


  constructor(props) {
    super(props);
  }


  render() {

    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Role Available</th>
            <th>Description</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td> <Badge variant="secondary">Designer</Badge></td>
            <td>Otto</td>
            <td><Button variant="secondary">Select</Button></td>
          </tr>
          <tr>
            <td>2</td>
            <td><Badge variant="secondary">Artist</Badge></td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget suscipit velit. Aenean a ex ut justo auctor dictum. Sed aliquet tortor purus, quis pellentesque risus tincidunt at. Phasellus egestas nibh quis nisl consectetur consequat. Nam dictum tellus ac nulla egestas, in molestie dui sodales. Morbi ipsum tortor, dapibus id risus id, aliquet sagittis ex. Pellentesque faucibus ipsum eu arcu sodales, et accumsan mi fermentum. Pellentesque eu porta dui. In sit amet magna dui. Vivamus viverra fermentum euismod.</td>
            <td><Button variant="secondary">Select</Button></td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td><Button variant="secondary">Select</Button></td>
          </tr>
        </tbody>
      </Table>
    )
}
}
