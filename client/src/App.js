import React, { Component } from "react";

import { connect } from "react-redux";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import Why from "./components/pages/Why/Why";
import Resources from "./components/pages/Resources/Resources";
import FAQ from "./components/pages/FAQ/FAQ";
import Profile from "./components/pages/Profile";
import NotFound from "./components/pages/NotFound";
import Landing from "./components/pages/Landing";
import EventsList from "./components/events/";


class App extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Router>
        <div>
          <AppNavbar />
          <Switch>
            <Route exact path="/" render={() => (isAuthenticated ? <Redirect to="/profile" /> : <Landing />)} />
            <Route path="/profile" render={() => (isAuthenticated ? <Profile /> : <Redirect to="/" />)} />
            <Route path="/resources" component={Resources} />
            <Route path="/faq" component={FAQ} />
            <Route path="/why" component={Why} />
            <Route path="/events" component={EventsList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
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
)(App);
