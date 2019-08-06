import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Figure from 'react-bootstrap/Figure'


import BrowseProjectCollection from '../browse/project-card-collection.js';

export default class ProjectProfile extends React.Component {

  state = {
    items : []
  };


  constructor(props) {
    super(props);
  }

  // reloadItemList = () => {
  // }


  componentDidMount(){
    const url = "http://127.0.0.1:5000/api/projects/fromuser"
    const promise = fetch(url,{
    method: "post",
    mode: "cors",
    headers:{
      "content-type" : "application/json"

    },
    body: JSON.stringify({
      userid: window.sessionStorage.getItem('user_id')
    })
    })
    promise.then(response=>response.json()).then(json=>{
      console.log(json.projects)
      this.setState({
        items: json.projects
      });
    }).catch(error=>console.log(error));
    this.setState({
      subtitle: "Browsing all projects that I have created..."
    })

  }

  render() {

    return (
      <Container>
      <Row>
      <Col md={2}>

      </Col>
      <Col>
          <h1>Project Name</h1>
          <p><b> 731 </b> Projects</p>

          <div>
          <b>Project Description: </b>
          <br />
          New York City, NY
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar at arcu id finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean lacinia urna metus, eu vestibulum augue posuere quis. Vestibulum pretium, mauris ut pharetra mollis, dui lectus porttitor magna, ut dignissim sem nunc ut mi.

          <br />
          <br />
          <b>Location: </b>
          <br />
          New York City, NY
          </div>
      </Col>
      </Row>
      </Container>
    )
}
}
