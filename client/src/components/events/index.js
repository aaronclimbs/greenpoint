import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, NavLink, Alert } from "reactstrap";
import { connect } from "react-redux";
import { loadList } from "../../actions/eventActions"

class EventList extends Component {

    componentDidMount() {

        this.props.loadList()

    }

    render() {

        return (

            <div> {this.props.events.events.map(event => {
              return  <p>{event.name}</p>;

            })} </div>


        )




    }


}












const mapStateToProps = state => ({
    events: state.events

});

export default connect(
    mapStateToProps,
    { loadList }
)(EventList);