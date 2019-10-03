import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  NavItem,
  Container
} from "reactstrap";
import SignupModal from "./auth/SignupModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
        <NavItem className="navbar-text mr-3">
          {user ? "Welcome " + user.name : ""}
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
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
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm">
          <Container>
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
