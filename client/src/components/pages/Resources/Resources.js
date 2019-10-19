import React, { Component } from "react";
import { connect } from "react-redux";
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
  CardText,
  Row,
  Form,
  Dropdown,
  DropdownItem,
  Popover,
  PopoverBody
} from "reactstrap";

import classnames from "classnames";
import axios from "axios";
import scraper from "../../../helpers/scraper";
import "./Resources.css";
import GoogleMapReact from "google-map-react";

class Resources extends Component {
  constructor(props) {
    super(props);

    this.popToggle = this.popToggle.bind(this);
  }

  state = {
    scrapeResults: [],
    materialQuery: "",
    activeTab: "1",
    materialOptions: [],
    selected: {},
    center: {
      lat: 38.9072,
      lng: -77.0369
    },
    zoom: 11,
    popOverDisplay: [],
    popoverOpen: false
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
    console.log("Form has been submitted. Search term is " + this.state.materialQuery);
    axios.get("api/helpers/recycle/" + this.state.materialQuery).then(response => {
      this.setState({
        materialOptions: response.data.result
      });
    });
  };

  getLocationData = e => {
    this.setState(
      {
        selected: {
          description: e.currentTarget.name,
          material_id: e.currentTarget.getAttribute("data-id")
        }
      },
      () => {
        this.setState({ materialQuery: "" });
        axios.get(`/api/helpers/locations/${this.state.selected.material_id}`).then(response => {
          console.log("Location data is " + JSON.stringify(response.data.result));

          this.setState({
            selected: {
              ...this.state.selected,
              locations: response.data
            }
          });
        });
      }
    );
  };

  // popArray =() => {
  //   var tempArray=[]
  //   console.log("location array is " + this.state.selected.locations.result.length)

  //   for (let i=0; i<this.state.selected.locations.result.length; i++ ) {
  //     tempArray.push({index:i, popoverOpen:false})
  //   }

  //   console.log("Temp array is " + JSON.stringify(tempArray))

  // this.setState({
  //   popOverDisplay: tempArray
  // })
  // }

  popToggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  async componentDidMount() {
    // this.earth911();

    // console.log("Loc is " + this.props.auth.user.location.lat)
    axios
      .get("https://cors-anywhere.herokuapp.com/https://www.onegreenplanet.org/channel/environment/")
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
          {/* Resources tabs starts here */}
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
                Related Links
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        {/* Resources tabs end here */}

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.state.scrapeResults.map((item, index) => {
              return (
                <div key={index}>
                  {/* Article Tab/Scraping starts here */}
                  <ListGroup>
                    <ListGroupItem>
                      <Card className="cardBox">
                        <CardBody>
                          <CardImg className="articleImage" src={item.image} />

                          <CardText>
                            <a className="articleTitle" href={item.link}>
                              {item.title}
                            </a>
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
        {/* Article Tab/Scraping ends here */}

        {/* Recycling map tab starts here */}
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="2">
            <br></br>
            <div className="materialSearch">
              <Form onSubmit={this.onGetMaterials}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend" className="APIsearch">
                    <InputGroupText>Enter material you want to recycle...</InputGroupText>
                  </InputGroupAddon>
                  <br></br>
                  <Input
                    type="text"
                    name="materialQuery"
                    value={this.state.materialQuery}
                    onChange={this.handleInputChange}
                  />
                  <Button color="success">Search</Button>
                </InputGroup>
              </Form>
              {this.state.materialQuery && (
                <Dropdown>
                  {this.state.materialOptions.map(option => {
                    return (
                      <DropdownItem
                        key={option.material_id}
                        data-id={option.material_id}
                        name={option.description}
                        onClick={this.getLocationData}
                      >
                        {option.description}
                      </DropdownItem>
                    );
                  })}
                </Dropdown>
              )}
              <br></br>
              <div style={{ height: "100vh", width: "100%" }}>
                {this.state.selected.locations && (
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDw0JZhy_QiGa9aBDIXyLP0lIqUXMPado8" }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                  >
                    {this.state.selected.locations.result.map((location, index) => {
                      return (
                        <div lat={location.latitude} lng={location.longitude}>
                          {" "}
                          <Button key={index} id={"popover-" + location.location_id} type="button">
                            {index}
                          </Button>
                          <Popover
                            placement="bottom"
                            isOpen={this.state.popoverOpen}
                            data-id={"popover-" + location.location_id}
                            target={"popover-" + location.location_id}
                            toggle={this.popToggle}
                          >
                            <PopoverBody>{location.description}</PopoverBody>
                          </Popover>
                        </div>
                      );
                    })}
                  </GoogleMapReact>
                )}
              </div>
            </div>
          </TabPane>
        </TabContent>
        {/* Recycling map tab ends here */}
        {/* Related Links tab starts here */}
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="3">
            <ul className="relatedLinks">
              <br></br>
              <li>
                <a className="rLinks" href="https://www.onegreenplanet.org">
                  One Green Planet
                </a>
              </li>
              <br></br>
              <li>
                <a className="rLinks" href="https://coolclimate.berkeley.edu/calculator">
                  CoolClimate Carbon Footprint Calculator from Berkeley
                </a>
              </li>
              <br></br>
              <li>
                <a className="rLinks" href="https://www.youtube.com/watch?v=ZwFA3YMfkoc&t=5111s">
                  Realtime Chat Application by JavaScript Mastery
                </a>
              </li>
              <br></br>
              <li>
                <a className="rLinks" href="https://www.chartjs.org/">
                  ChartJS
                </a>
              </li>
              <br></br>
              <li>
                <a className="rLinks" href="https://api.earth911.com/">
                  Earth911 API
                </a>
              </li>
              <br></br>
              <li>
                <a className="rLinks" href="https://www.twilio.com/">
                  Twilio
                </a>
              </li>
              <br></br>
              <li>
                <a className="rLinks" href="https://sendgrid.com/">
                  SendGrid
                </a>
              </li>
              <br></br>
            </ul>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {}
)(Resources);
