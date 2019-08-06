import React, { Component } from "react";

import Badge from 'react-bootstrap/Badge'
import Form from "react-bootstrap/Form";
import Label from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";


export default class TagInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      focused: false,
      input: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  render() {
    const styles = {
      container: {
        border: '1px solid #ddd',
        padding: '5px',
        borderRadius: '5px',
      },

      items: {
        display: 'inline-block',
        padding: '2px',
        border: '1px solid blue',
        fontFamily: 'Helvetica, sans-serif',
        borderRadius: '5px',
        marginRight: '5px',
        cursor: 'pointer'
      },

      input: {
        outline: 'none',
        border: 'none',
        fontSize: '14px',
        fontFamily: 'Helvetica, sans-serif'
      }
    };
    return (

        // <ul style={styles.container}>
        //   {this.state.items.map((item, i) =>
        //     <li key={i} style={styles.items} onClick={this.handleRemoveItem(i)}>
        //       {item}
        //       <span>(x)</span>
        //     </li>
        //   )}
        <div>
          <FormControl
            placeholder="Press [Enter] to add tags & [Backspace] to remove them..."
            value={this.state.input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown} />

          <div>
          <span><b>Tags:  </b></span>
          {this.state.items.map((item, i) =>
            <Badge variant="secondary" onClick={this.handleRemoveItem(i)}>
              {item}
            </Badge>
          )}
          </div>
        </div>
    );
  }

  handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    if ( evt.keyCode === 13 ) {
      const {value} = evt.target;

      this.setState(state => ({
        items: [...state.items, value],
        input: ''
      }), function () {
        this.props.updateTags(this.state.items)
      });
    }

    if ( this.state.items.length && evt.keyCode === 8 && !this.state.input.length ) {
      this.setState(state => ({
        items: state.items.slice(0, state.items.length - 1)
      }),function () {
        this.props.updateTags(this.state.items)
      });
    }

  }

  handleRemoveItem(index) {
    return () => {
      this.setState(state => ({
        items: state.items.filter((item, i) => i !== index)
      }));
    }
  }
}
