import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../navbar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BrowseProjectCollection from './project-card-collection.js';

export default class Browse extends React.Component {

  state = {
    items : []
  };


  constructor(props) {
    super(props);
  }

  // reloadItemList = () => {
  // }


  componentDidMount(){
    const url = "http://127.0.0.1:5000/api/projects/all"
    const promise = fetch(url)
    promise.then(response=>response.json()).then(json=>{
      this.setState({
        items: json.projects
      });
      console.log(json.projects)
    }).catch(error=>console.log(error));
  }


  render() {
    return (
      <div>
      <h1><center> Browse Projects </center></h1>
      <BrowseProjectCollection items={this.state.items} />
      </div>
    )
}
}
