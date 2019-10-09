import React, { Component } from "react";
import { connect } from "react-redux";
import EventList from '../events'

class Profile extends Component {
  render() {

    return <div>
    <div>Welcome to your profile, {this.props.auth.user.name} </div>
    <EventList userID={this.props.auth.user._id}/>
    </div>
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  {}
)(Profile);
