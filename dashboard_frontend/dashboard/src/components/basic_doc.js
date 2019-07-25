import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
import basic_doc_menu from './basic_doc_menu';
import Immutable from 'immutable';
import {DefaultDraftBlockRenderMap} from 'draft-js';


export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    /* blockRenderMap */
    // this.blockRenderMap = Map({
    //     [TODO_BLOCK]: {
    //         element: 'div',
    //     },
    // }).merge(DefaultDraftBlockRenderMap);



    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

    // this function maps keys we press to strings that represent some action (eg 'undo', or 'underline')
  // then the this.handleKeyCommand('underline') function gets called with this string.
  keyBindingFn = (event) => {
    // we press CTRL + K => return 'bbbold'
    // we use hasCommandModifier instead of checking for CTRL keyCode because different OSs have different command keys
    if (event.keyCode === 192) {
      console.log("key binding works")
      return 'bbbold';
    }
    // manages usual things, like:
    // Ctrl+Z => return 'undo'
    return getDefaultKeyBinding(event);
  }
  

  handleKeyCommand(command, editorState) {
    let newState = RichUtils.handleKeyCommand(editorState, command);

    if (command === 'bbbold') {
      // <basic_doc_menu />
      newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
      this.setState({
        displayMenu : "true"
      })
    }

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }





  myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
      return 'superFancyBlockquote';
    }
  }







  render() {
    const blockRenderMap = DefaultDraftBlockRenderMap.merge(
      Immutable.Map({
        'section': {
          element: <basic_doc_menu />
      }})
    );



    return (
      <div>
      <Editor placeholder="Write here. Type [ ] to add a todo ..."
      editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand}
      onChange={this.onChange} keyBindingFn={this.keyBindingFn}
      blockStyleFn={this.myBlockStyleFn} blockRenderMap={blockRenderMap}
      displayMenu={this.state.displayMenu} />

      </div>
    );
  }
}
