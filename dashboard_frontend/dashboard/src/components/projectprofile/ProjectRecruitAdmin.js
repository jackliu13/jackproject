import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table'

import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';

import './ProjectRecruit.css'

export default class ProjectRecruitAdmin extends React.Component {

  state = {
  };


  constructor(props) {
    super(props);
  }




  render() {
    let items = []
    if (this.props.items.length != 0){
      items = this.props.items.map((item)=>
      <tr className="listing-row" onClick={() => this.props.clickRow(item.id)}>
        <td> <Badge variant="primary">{item.role}</Badge> </td>
        <td>{item.description}</td>
      </tr>
      )
    }
    else {
      return (
        <p><b>There is no current listings for this project</b></p>
      )
    }

    return (
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Role Available</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
}
}
