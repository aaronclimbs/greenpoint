import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarBrand, Nav, NavLink, NavbarToggler, NavItem, Container } from "reactstrap";
import SignupModal from "../../auth/SignupModal";
import Logout from "../../auth/Logout";
import LoginModal from "../../auth/LoginModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from './logo.svg';
import "./style.css"

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>

        <NavItem>
        </NavItem>
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
        <Navbar color="dark" dark expand="sm">
          <Container>
          <img src={logo} className="App-logo" alt="logo" />
            <NavbarBrand href="/">GreenPoint</NavbarBrand>
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
  null
)(AppNavbar);