import React, { Component } from "react";
import { ListGroup, ListGroupItem, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import axios from "axios";
import compression from "compression";
import scraper from "../../../helpers/scraper"
import "./Resources.css"

export default class Resources extends Component {
  state = {
    scrapeResults: []
  };

  tabs(props) {
  this.toggle = this.toggle.bind(this);
  this.state = {
    activeTab: '1'
  };
}

toggle(tab) {
  if (this.state.activeTab !== tab) {
    this.setState({
      activeTab: tab
    });
  }
}

earth911= () => {
  console.log("****************************************");
  
  var APIkey = "c9787ace9febf338";
  
  var query = "plastic"

  fetch(
    "https://cors-anywhere.herokuapp.com/http://api.earth911.com/earth911.searchMaterials?query=" + query + "&api_key=" + APIkey
    )
    .then(function (response) {
      console.log("Earth911 data is:" + (response) + "************************** Our item is: " + (query));
      

    })
}

  async componentDidMount() {
    this.earth911()
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://www.onegreenplanet.org/channel/environment/"
      )
      .then(response => scraper(response))
      .then(result => this.setState({ scrapeResults: result }))
      .catch(err => console.log(err));
  }

  render() {
    // Page Render
    return (
      <div>
        <h5 className="text-center mt-2 mb-2">Resources</h5>
        <Nav tabs>
          <NavItem>
            <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                        >
                          Articles
                        </NavLink>
                      </NavItem>
                      <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Where to Recycle?
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Carbon Footprint Calculator
            </NavLink>
          </NavItem>
        </Nav>
        
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
        {this.state.scrapeResults.map(item => {
          return <div>
            <ListGroup>
              <ListGroupItem>
            <img className="articleImage text-center" src={item.image} />
            <h5 className="articleTitle" href={item.link}>{item.title} </h5>
            </ListGroupItem>
            </ListGroup>
            </div>
        })}
                  </TabPane>
                  </TabContent>
      </div>
    );
  }
}


