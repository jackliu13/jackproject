import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table'

import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';

import './ProjectRecruit.css'

export default class ProjectRecruitAdminIndividual extends React.Component {

  state = {
    items: []
  };


  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const url = "http://127.0.0.1:5000/api/project/recruit-requests"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"
    },
    body: JSON.stringify({
      recruitid: this.props.selectedId
    })
    })
    promise.then(response=>response.json()).then(json=>{
      this.setState({
        items: json.recruitrequests
      });
    }).catch(error=>console.log(error));
  }




  render() {
    let items = []
    if (this.state.items.length != 0){
      items = this.state.items.map((item)=>
      <tr className="listing-individual-row">
        <td> {item.username} </td>
        <td>{item.message}</td>
      </tr>
      )
    }
    else {
      return (
        <p><b>Currently there are no replys to this listing</b></p>
      )
    }

    return (
      <>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
      </>
    )
}
}
