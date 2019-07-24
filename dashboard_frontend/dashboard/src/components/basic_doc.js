import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
import basic_doc_menu from './basic_doc_menu';


export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
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
      <basic_doc_menu />
      // newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
    }

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }


  // myKeyBindingFn = e => {
  //   if (e.keyCode === 49 && hasCommandModifier(e)) { //Cmd+1
  //     return 'header-one';
  //   }
  //   return getDefaultKeyBinding(e);
  // }
  //
  // handleKey = command => {
  //   if (command === 'header-one') {
  //     setEditorState(
  //       RichUtils.toggleBlockType(editorState, 'header-one')
  //     );
  //     return 'handled';
  //   }
  //   if (command === 'bold') {
  //     setEditorState(
  //       RichUtils.toggleInlineStyle(editorState, 'BOLD')
  //     );
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // }






  render() {
    return (
      <div>
      <Editor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} keyBindingFn={this.keyBindingFn} />

      </div>
    );
  }
}
