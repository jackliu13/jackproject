import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';

import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'

import ProjectRecruit from './ProjectRecruit.js';
import ProjectRecruitApply from './ProjectRecruitApply.js'

import './ProjectOverview.css';

export default class ProjectOverview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      recruitObjects: [],
      showRecruitModal: true,
      selectedRecruitID : ""
    };

    this.hideModal = this.hideModal.bind(this)
    this.clickRecruitRow = this.clickRecruitRow.bind(this)
  }

  handleClick = event => {
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
      this.setState({
        showModal: true,
      });
    }).catch(error=>console.log(error));
  }

  hideModal(){
    this.setState({
      showModal: false,
      showRecruitModal: true,
      selectedRecruitID: ""
    });
  }


  clickRecruitRow = (id) => {
    this.setState({
      showRecruitModal: false,
      selectedRecruitID: id
    })
  }



  render() {

    let tags = []
    if (this.props.tags != null){
      tags = this.props.tags.map((item)=>
          <span>
          <Badge variant="secondary">
              {item}
          </Badge>
          <span> </span>
          </span>
      )
    }
    else {
      tags = ['None']
    }

    return (
      <>
      <Modal dialogClassName="project_recruit_modal" show={this.state.showModal} onHide={this.hideModal} size="lg">
        <Modal.Header closeButton>
          <div>
          <h4> Become apart of the project </h4>
          <p><i>Here are the current available roles for this project</i></p>
          </div>
        </Modal.Header>
        <Modal.Body>
          {
              this.state.showRecruitModal ?
              <ProjectRecruit items={this.state.recruitObjects} clickRow={this.clickRecruitRow} />
              : <ProjectRecruitApply recruitid={this.state.selectedRecruitID}/>
          }

        </Modal.Body>
      </Modal>


      <h1> {this.props.title}</h1>
      <div>
      <b>Project Description: </b>
      <br />
      {this.props.description}
      <br />
      <br />
      <b>Tags: </b>
      <br />
      {tags}
      <br />
      <br />
      <b>Location: </b>
      <br />
      New York City, NY
      </div>
      <hr />
      <Row className="project-overview_button-row">
      <Col>
      <center>
      <Button className="joinProject" block type="button" onClick={() => this.handleClick()}> Request to join the Project</Button>
      <br />
      <h3><b>OR</b></h3>
      <br />
      <Button className="followProject" block type="button"> Follow Project</Button>
      </center>
      </Col>
      </Row>
      </>
    )

  }

}
