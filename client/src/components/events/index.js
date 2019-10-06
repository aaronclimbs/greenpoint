import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, NavLink, Alert } from "reactstrap";
import { connect } from "react-redux";
import { loadList } from "../../actions/eventActions";
import FuzzySearch from "../FuzzySearch";

class EventList extends Component {
  componentDidMount() {
    this.props.loadList();
  }

  render() {
    const { events } = this.props.events;
    return (
      <div>
        <FuzzySearch events={events} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { loadList }
)(EventList);
