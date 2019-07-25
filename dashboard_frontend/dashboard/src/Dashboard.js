import React from 'react';


import './App.css';
import Navigation from './components/navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyEditor from './components/basic_doc.js'
import Doc_Menu from './components/basic_doc_menu.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Dashboard extends React.Component {
  render() {
    return (

      <div className="App">
        <Navigation />
        <Container>
          <row>
          <Col md={3}>
            <div className="Sidebar">
            <h1> Test </h1>
            </div>
          </Col>
          <Col>
            <div>
              <h1> Editor works?</h1>
              <MyEditor />
            </div>
            <div className="Test Menu">
              <Doc_Menu />
            </div>
          </Col>
          </row>

        </Container>

      </div>
    )



  }



}

export default Dashboard;
