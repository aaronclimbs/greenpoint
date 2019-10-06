import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { connect } from "react-redux";
import { loadList } from "../../actions/eventActions"

class EventList extends Component {

    state = {
        dropdownOpen: false,
        dropdownValue:"Choose a Green Action",
        selected: []
      };

      onClick = e => {
        e.preventDefault();
          console.log("Item list click" + e.target.value)
        this.setState({
            selected: [...this.state.selected, e.currentTarget.value]
        }, () => {
            this.setState({
                dropdownValue: this.state.selected.length > 0 ? "Choose another Green Action" : "Choose a Green Action"
            })
        });
      };

    componentDidMount() {

        this.props.loadList()

    }

    toggle = () => {
        this.setState ({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    render() {

        return (


        <Form onSubmit={this.onSubmit}>
           
        <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
         {this.state.dropdownValue}
        </DropdownToggle>
        <DropdownMenu >
          <DropdownItem header>Choose an Event</DropdownItem>
          <DropdownItem divider />
          {this.props.events.events.map(event => {
              return  <DropdownItem onClick={this.onClick} name="dropdownValue" key={event._id} value={event.name}><div >{event.name}</div></DropdownItem>;

            })}
       
        </DropdownMenu>
        </Dropdown>
         
        </Form>




          


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