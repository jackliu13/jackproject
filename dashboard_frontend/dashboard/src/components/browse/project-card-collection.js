import React, {Component} from 'react';
import BrowseProjectCard from './project-card.js';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container';

import './project-card-collection.css'

export default class BrowseProjectCollection extends Component {

    render() {
        const items = this.props.items.map((dict, index)=>
            <BrowseProjectCard {...dict} key={index} onClick={this.props.onClick} />
        )
        const numberOfItems = items.length

        const startRowLabel=<CardDeck>;
        const endRowLabel=</CardDeck>;

        let addItems = [];
        let displayItems = [];

        for (let index=0; index < numberOfItems; index++) {
          addItems.push(items[index])
          if ((index + 1) % 3 == 0) {
              console.log("NEW ROW", addItems)
              displayItems.push(
                  <CardDeck className="browse-projects" key={index}>
                      {addItems}
                  </CardDeck>
              )
              addItems = []
            }
        }
        displayItems.push(
          <CardDeck className="browse-projects">
              {addItems}
          </CardDeck>
        )


        return (
            <Container className="cardCollectionContainer">
            <div className="card-deck">
                {displayItems}
            </div>
            </Container>
        );
    }
}
