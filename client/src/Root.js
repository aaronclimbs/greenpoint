import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Root.css";
import App from "./App";
import { loadUser } from "./actions/authActions";

export default class Root extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
