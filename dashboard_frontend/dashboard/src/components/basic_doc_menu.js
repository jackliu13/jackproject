import React from 'react';

import { EditorBlock, EditorState } from 'draft-js';

import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const updateDataOfBlock = (editorState, block, newData) => {
  const contentState = editorState.getCurrentContent();
  const newBlock = block.merge({
    data: newData,
  });
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
};


export default class Doc_Menu extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className="container-fluid">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#link1">
              Vote Module
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Test Module
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">
              <p> Start a poll </p>
            </Tab.Pane>
            <Tab.Pane eventKey="#link2">
              <p> Test Module description </p>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
      </Tab.Container>
      </div>

    )

  }
}
