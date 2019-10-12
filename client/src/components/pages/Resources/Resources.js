import React, { Component } from "react";
import {
  CardBody,
  CardImg,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import scraper from "../../../helpers/scraper";
import "./Resources.css";

const APIkey = "c9787ace9febf338";
const materialID = [];

export default class Resources extends Component {
  state = {
    scrapeResults: [],
    materialQuery: "",
    activeTab: "1"
  };

  tabs(tab) {
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  onClick = e => {
    e.preventDefault();
    console.log(
      "Button has been clicked. Search term is " + this.state.materialQuery
    );

    const eventItem = {
      materialID: e.materialID
    };
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://api.earth911.com/earth911.searchMaterials?query=" +
          this.state.materialQuery +
          "&api_key=" +
          APIkey
        // "https://cors-anywhere.herokuapp.com/http://api.earth911.com/earth911.material_id=" + materialID + "&api_key=" + APIkey
      )
      .then(res => {
        console.log(res.data);
      });
  };

  earth911 = () => {
    console.log("****************************************");

    const recyclingLocations = [];

    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://api.earth911.com/earth911.searchLocations?latitude=38.9072&longitude=-77.0369&material_id=" +
          materialID +
          "&api_key=" +
          APIkey
      )
      .then(function(response) {
        console.log(
          "Earth911 data is:" +
            JSON.stringify(response) +
            "************************** Our item is: " +
            recyclingLocations
        );
      });
  };

  async componentDidMount() {
    this.earth911();
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
        <Row className="justify-content-md-center mt-5">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Articles
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Where to Recycle?
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "3" })}
                onClick={() => {
                  this.toggle("3");
                }}
              >
                Carbon Footprint Calculator
              </NavLink>
            </NavItem>
          </Nav>
        </Row>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.state.scrapeResults.map(item => {
              return (
                <div>
                  <ListGroup>
                    <ListGroupItem>
                      <Card>
                        <CardBody>
                          <CardImg className="articleImage" src={item.image} />

                          <CardText>
                            <h5 className="articleTitle" href={item.link}>
                              {item.title}{" "}
                            </h5>
                          </CardText>
                        </CardBody>
                      </Card>
                    </ListGroupItem>
                  </ListGroup>
                </div>
              );
            })}
          </TabPane>
        </TabContent>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="2">
            <div className="materialSearch">
              <InputGroup>
                <InputGroupAddon addonType="prepend" className="APIsearch">
                  <InputGroupText>
                    Enter material you want to recycle...
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  name="materialQuery"
                  value={this.state.materialQuery}
                  onChange={this.handleInputChange}
                />
                <Button onClick={this.onClick} color="success">
                  Search
                </Button>
              </InputGroup>
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
