import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../navbar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {isLoggedIn} from '../../services/logged-in.js';

import UploadProjectForm from './upload-project-form.js'

export default class UploadProject extends React.Component {

  state = {
    items : []
  };


  constructor(props) {
    super(props);
  }




  render() {
    if (isLoggedIn()){
      return (
        <div>
        <h2><center> Upload your project! </center></h2>
        <p><center> Create & Build your project profile</center></p>
        <UploadProjectForm />
        </div>
      )
    }
    return (
      <div>
      <h2><center> Upload your project! </center></h2>
      <p><center> You must be <b>logged in</b> to upload a project</center></p>
      </div>
    )



}
}
