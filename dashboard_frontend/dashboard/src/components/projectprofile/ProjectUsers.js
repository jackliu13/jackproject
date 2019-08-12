import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import ProjectUsersCard from './ProjectUsersCard';



export default class ProjectUsers extends React.Component {

  state = {
  };


  constructor(props) {
    super(props);
  }


  render() {
    const items = this.props.users.map((dict, index)=>
        <ProjectUsersCard {...dict} key={index} />
    )

    return (
      <div>
      {items}
      </div>
    )
}
}
