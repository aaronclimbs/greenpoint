import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarBrand, Nav, NavLink, NavbarToggler, NavItem, Container } from "reactstrap";
import SignupModal from "../../auth/SignupModal";
import Logout from "../../auth/Logout";
import LoginModal from "../../auth/LoginModal";
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
    weatherCaption: "",
    weatherRun: false
  };

  constructor() {
    super();
    this.sendSocketIO = this.sendSocketIO.bind(this);
    this.setState = this.setState.bind(this);
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

  checkRender = userloc => {
    console.log("I am loggin for render " + userloc);

    console.log("user location is " + JSON.stringify(userloc));

    if (userloc !== "No location available") {
      if (this.state.weatherRun === false) {
        socket.emit("getWeather", userloc);
        this.setState({ weatherRun: true });
      } else {
        const getWeather = userloc => {
          socket.emit("getWeather", userloc);
        };

        setInterval(() => getWeather(userloc), 300000);
      }
    }
  };

  componentDidMount() {
    this.setState({
      weatherRun: false
    });

    socket.on("Weather", (data, city) => {
      console.log("I have the weather in Navbar");
      console.log(data);
      var tempWeatherImg = "";
      var tempWeatherCaption = "";

      switch (data.icon) {
        case "clear-night":
          tempWeatherImg = "../images/clear-night.jpg";
          tempWeatherCaption = "Perfect weather to look at the stars!";
          break;
        case "clear-day":
          tempWeatherImg = "../images/clear-day.jpg";
          tempWeatherCaption = "Solar panels would work great today!";
          break;
        case "cloudy":
          tempWeatherImg = "../images/cloudy.jpg";
          tempWeatherCaption = "Don't let the clouds keep you inside!";
          break;
        case "rain":
          tempWeatherImg = "../images/rain.jpg";
          tempWeatherCaption = "It's raining. Water your plants naturally outside!";
          break;
        case "partly-cloudy-day":
          tempWeatherImg = "../images/partly-cloudy-day.jpg";
          tempWeatherCaption = "Some sun is better than none!";
          break;
        case "partly-cloudy-night":
          tempWeatherImg = "../images/partly-cloudy-night.jpg";
          tempWeatherCaption = "It's dark out. Who care's if its cloudy!";
          break;
        case "snow":
          tempWeatherImg = "../images/snow.jpg";
          tempWeatherCaption = "Turn down the heat. Grab a blanket instead!";
          break;
        case "wind":
          tempWeatherImg = "../images/wind.jpg";
          tempWeatherCaption = "Windmills are generating power today!";
          break;
        case "sleet":
          tempWeatherImg = "../images/sleet.jpg";
          tempWeatherCaption = "Drive your Hybrid or Ev slower today!";
          break;
        case "fog":
          tempWeatherImg = "../images/fog.jpg";
          tempWeatherCaption = "Drive your Hybrid or Ev slower today!";
          break;
        default:
          tempWeatherImg = "../images/unknown.jpg";
          tempWeatherCaption = "My AI can't determine the weather";
      }

      this.setState({
        message: city + " Weather, " + data.summary + " " + Math.round(data.temperature) + "\xB0",
        weatherImg: tempWeatherImg,
        weatherCaption: tempWeatherCaption
      });
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    this.checkRender(user ? user.location : "No location available");

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
          <NavLink tag={Link} to={`/chat?name=${user ? user.name : "Guest"}&room=GreenPoint%20Support`}>
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

    return (
      <div>
        <Navbar className="navbar-css" dark expand="sm">
          <Container>
            <img src={logo} className="App-logo" alt="logo" />
            <NavbarBrand href="/">GreenPoint</NavbarBrand>
            <div className="weather-container">
              <div className="weather-info">{this.state.message} </div>
              {this.state.weatherImg ? (
                <div className="weather-img-cont">
                  <img
                    className="weather-img"
                    src={this.state.weatherImg}
                    alt={"weather-image-" + this.state.weatherImg.replace(".jpg", "")}
                  />
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

export default connect(mapStateToProps)(AppNavbar);
