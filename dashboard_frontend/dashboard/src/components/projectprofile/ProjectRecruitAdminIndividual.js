import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table'

import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';

import './ProjectRecruitAdminIndividual.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ProjectRecruitAdminIndividual extends React.Component {

  state = {
    items: []
  };


  constructor(props) {
    super(props);

    this.findRecruitRequests = this.findRecruitRequests.bind(this)

  }

  componentDidMount(){
    this.findRecruitRequests()
  }

  // componentDidUpdate(){
  //   this.findRecruitRequests()
  // }

  findRecruitRequests(){
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

  acceptRequest = (id) => {
    console.log(id)
    const url = "http://127.0.0.1:5000/api/project/recruit-requests/accept"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"
    },
    body: JSON.stringify({
      recruitrequestid: id
    })
    })
    promise.then(response=>response.json()).then(json=>{
      this.findRecruitRequests()
    }).catch(error=>console.log(error));
  }

  rejectRequest = (id) => {
    const url = "http://127.0.0.1:5000/api/project/recruit-requests/accept"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"
    },
    body: JSON.stringify({
      recruitrequestid: id
    })
    })
    promise.then(response=>response.json()).then(json=>{
      this.findRecruitRequests()
    }).catch(error=>console.log(error));
  }



  render() {
    let items = []
    if (this.state.items.length != 0){
      items = this.state.items.map((item)=>
      <tr className="listing-individual-row">
        <td> {item.username} </td>
        <td>{item.message}</td>
        <td>
          <Row>
          <Button className="check" onClick={() => this.acceptRequest(item.id)}><FontAwesomeIcon icon="check" /></Button>
          <Button className="reject" onClick={() => this.rejectRequest(item.id)}><FontAwesomeIcon icon="times" /></Button>
          </Row>
        </td>
      </tr>
      )
    }
    else {
      return (
        <>
        <Button className="goBack" onClick={() => this.props.goBack()}><FontAwesomeIcon icon="arrow-left" /> Go Back</Button>
        <br />
        <p><b>Currently there are no replys to this listing</b></p>
        </>
      )
    }

    return (
      <>
      <Button className="goBack" onClick={() => this.props.goBack()}><FontAwesomeIcon icon="arrow-left" /> Go Back</Button>
      <br /> <br />
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
