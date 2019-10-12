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
  Form,
  Dropdown,
  DropdownItem
} from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import scraper from "../../../helpers/scraper";
import "./Resources.css";

export default class Resources extends Component {
  state = {
    scrapeResults: [],
    materialQuery: "",
    activeTab: "1",
    materialOptions: [],
    selected: {}
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

  onGetMaterials = e => {
    e.preventDefault();
    console.log(
      "Form has been submitted. Search term is " + this.state.materialQuery
    );
    axios.get("api/helpers/recycle/" + this.state.materialQuery)
    .then(response => {
      this.setState({
        materialOptions: response.data.result
      })
    })
};

getLocationData = e => {
  this.setState({selected : {
    description: e.currentTarget.name,
    material_id: e.currentTarget.getAttribute("data-id")
  } }, () => {
    this.setState({materialQuery: ""})
    axios.get(`/api/helpers/locations/${this.state.selected.material_id}`).then(response => {
      this.setState({
        selected: {
          ...this.state.selected,
          locations: response.data
        }
      })
    })
  })
}

  async componentDidMount() {
    // this.earth911();
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
              <Form onSubmit={this.onGetMaterials}>
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
                  <Button color="success">
                    Search
                  </Button>
                </InputGroup>
              </Form>
              {this.state.materialQuery && <Dropdown>
              {this.state.materialOptions.map(option => {
                return <DropdownItem key={option.material_id} data-id={option.material_id} name={option.description} onClick={this.getLocationData}>{option.description}</DropdownItem>
              })}
              </Dropdown>}
              {this.state.selected.locations && <ListGroup>
                {this.state.selected.locations.result.map(location => {
                  return <ListGroupItem>{location.description} Distance: {location.distance}</ListGroupItem>
                })}
              </ListGroup>}
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
