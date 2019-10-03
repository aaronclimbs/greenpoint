import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    return <div>Welcome to your profile, {this.props.auth.user.name}</div>;
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  {}
)(Profile);
