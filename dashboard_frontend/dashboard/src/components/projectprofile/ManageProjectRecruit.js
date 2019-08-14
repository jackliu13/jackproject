import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table'

import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';

import Modal from 'react-bootstrap/Modal';

import NewRecruitForm from './NewRecruitForm.js'
import ProjectRecruitAdmin from './ProjectRecruitAdmin.js'
import ProjectRecruitAdminIndividual from './ProjectRecruitAdminIndividual.js'


export default class ManageProjectRecruit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      recruitObjects: [],
      selectedRecruitID: ""
    };

    this.hideModal = this.hideModal.bind(this)
    this.clickRecruitRow = this.clickRecruitRow.bind(this)
  }

  handleClick = event => {
    this.setState({
      showModal: true,
    });
  }

  hideModal(){
    this.setState({
      showModal: false,
    });
  }

  clickRecruitRow = (id) => {
    this.setState({
      selectedRecruitID: id
    })

  }

  componentDidMount(){
    const url = "http://127.0.0.1:5000/api/project/recruits"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"

    },
    body: JSON.stringify({
      projectid: this.props.projectid
    })
    })
    promise.then(response=>response.json()).then(json=>{
      this.setState({
        recruitObjects: json.recruits
      });
    }).catch(error=>console.log(error));
  }


  render() {
    return (
      <>
      <Modal dialogClassName="project_recruit_modal" show={this.state.showModal} onHide={this.hideModal} size="lg">
        <Modal.Header closeButton>
          <div>
            <h4> Add a new Recruit Listing </h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <NewRecruitForm />
        </Modal.Body>
      </Modal>






      <h3> Find project collaborators</h3>
      <Row>
      <Col>
      <p> Listed are the current requests</p>
      </Col>
      <Button onClick={() => this.handleClick()}>Add</Button>
      </Row>
      <hr />
      {
          this.state.selectedRecruitID ?
          <ProjectRecruitAdminIndividual selectedId={this.state.selectedRecruitID} />
          : <ProjectRecruitAdmin items={this.state.recruitObjects} clickRow={this.clickRecruitRow} />

      }


      </>
    )
}
}
