// Tech, Art, Business, Crafts, Video & Animation, Writing
import React, { Component } from "react";

import Badge from 'react-bootstrap/Badge'

export default class ProjectCategoryBadges extends Component {

  render(){
    if (this.props.category === "Tech"){
      return (
        <Badge variant="info">Tech</Badge>
      )
    }
    else if (this.props.category === "Art"){
      return (
        <Badge variant="warning">Art</Badge>
      )
    }

    else if (this.props.category === "Business"){
      return(
        <Badge variant="primary">Business</Badge>
      )
    }

    else if (this.props.category === "Crafts"){
      return(
        <Badge variant="danger">Business</Badge>
      )
    }

    else if (this.props.category === "Video"){
      return(
        <Badge variant="success">Business</Badge>
      )
    }

    return (
      <Badge variant="secondary">Other</Badge>
    )

  }


}
