import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavbarToggler,
  NavItem,
  Container
} from "reactstrap";
import SignupModal from "../../auth/SignupModal";
import Logout from "../../auth/Logout";
import LoginModal from "../../auth/LoginModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "./logo.svg";
import "./style.css";
import openSocket from "socket.io-client";

const socket = openSocket("/");

class AppNavbar extends Component {
  state = {
    isOpen: false,
    message: "",
    weatherImg: "",
    weatherCaption: ""
  };

  constructor() {
    super();
    this.sendSocketIO = this.sendSocketIO.bind(this);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  sendSocketIO(msg) {
    socket.emit("Test", msg);
  }

  componentDidMount() {
    socket.emit("getWeather", "Test");

    socket.on("Weather", data => {
      console.log("I have the weather in Navbar");
      console.log(data);
      var tempWeatherImg = "";
      var tempWeatherCaption = "";

      switch (data.icon) {
        case "clear-night":
          tempWeatherImg = "../images/clear-night.jpg";
          tempWeatherCaption = "Turn down the heat. Grab a blanket instead!";
          break;
        case "clear-day":
          tempWeatherImg = "../images/clear-day.jpg";
          break;
        case "cloudy":
          tempWeatherImg = "../images/cloudy.jpg";
          break;
        case "rain":
          tempWeatherImg = "../images/rain.jpg";
          tempWeatherCaption =
            "It's raining. Water your plants naturally outside!";
          break;
        case "partly-cloudy-day":
          tempWeatherImg = "../images/partly-cloudy-day.jpg";
          break;
        case "partly-cloudy-night":
          tempWeatherImg = "../images/partly-cloudy-night.jpg";
          break;
        case "snow":
          tempWeatherImg = "../images/snow.jpg";
          break;
        case "wind":
          tempWeatherImg = "../images/wind.jpg";
          break;
        case "sleet":
          tempWeatherImg = "../images/sleet.jpg";
          break;
        case "fog":
          tempWeatherImg = "../images/fog.jpg";
          break;
        default:
          tempWeatherImg = "../images/unknown.jpg";
      }

      this.setState({
        message:
          "Current Weather: " +
          data.summary +
          " " +
          Math.round(data.temperature) +
          "\xB0",
        weatherImg: tempWeatherImg,
        weatherCaption: tempWeatherCaption
      });
    });
  }

  render() {
    // console.log("userobject is" + (this.props.auth.user))

    // console.log("user name " + this.props.auth.user.name)

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem></NavItem>
        <NavItem>
          <NavLink tag={Link} to="/resources">
            Resources
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/faq">
            FAQ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/why">
            Why GreenPoint?
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link}
            to={`/chat?name=${
              user ? user.name : "Guest"
            }&room=GreenPoint%20Support`}
          >
            Support Chat
          </NavLink>
        </NavItem>
        <Logout />
      </Fragment>
    );

    const unRegisteredLinks = (
      <Fragment>
        <NavItem>
          <SignupModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/faq">
            FAQ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/why">
            Why GreenPoint?
          </NavLink>
        </NavItem>
      </Fragment>
    );
    console.log(JSON.stringify(this.props.auth.user));

    return (
      <div>
        <Navbar className="navbar-css" dark expand="sm">
          <Container>
            <img src={logo} className="App-logo" alt="logo" />
            <NavbarBrand href="/">GreenPoint</NavbarBrand>
            <div className="weather-container">
              <div className="weather-info">{this.state.message} </div>{" "}
              {this.state.weatherImg ? (
                <div className="weather-img-cont">
                  <img className="weather-img" src={this.state.weatherImg} />{" "}
                </div>
              ) : (
                <div></div>
              )}
              <div className="weather-caption">{this.state.weatherCaption}</div>
            </div>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : unRegisteredLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  {}
)(AppNavbar);
