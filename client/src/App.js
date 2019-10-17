import React, { Component } from "react";

import { connect } from "react-redux";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import AppNavbar from "./components/pages/navbar/";
import Why from "./components/pages/Why/Why";
import Resources from "./components/pages/Resources/Resources";
import FAQ from "./components/pages/FAQ/FAQ";
import Profile from "./components/pages/profile/";
import Stats from "./components/pages/stats/";
import NotFound from "./components/pages/404/";
import Landing from "./components/pages/landing/";
import EventsList from "./components/events/";
import DoughnutChart from "./components/doughnut/";
import LineChart from "./components/line/";
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

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
            <Route path="/stats" component={Stats} />
            <Route path="/doughnut" component={DoughnutChart} />
            <Route path="/line" component={LineChart} />
            <Route path="/join" component={Join} />
            <Route path="/chat" component={Chat} />
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

