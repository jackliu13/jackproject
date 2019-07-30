import React, {Component} from 'react';
import BrowseProjectCard from './project-card.js';
import Card from 'react-bootstrap/Card'

export default class BrowseProjectCollection extends Component {

    render() {
        const items = this.props.items.map((dict, index)=>
            <BrowseProjectCard {...dict} />
        )
        return (

            <div className="card-deck">

                {items}
            </div>
        );
    }
}
