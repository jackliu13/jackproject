import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class MyEditor extends React.Component {
  render() {
    return (

      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#link1">
              Link 1
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Link 2
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">
              <h1> Test </h1>
            </Tab.Pane>
            <Tab.Pane eventKey="#link2">
              <h1> Test </h1>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
      </Tab.Container>

    )

  }
}
