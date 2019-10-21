import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./style.css";

// import { addDays } from "date-fns";

const moment = require("moment");

class EventList extends Component {
  state = {
    dropdownOpen: true,
    dropdownValue: "Choose a Green Action",
    eventDate: this.props.displayDate
  };

  // handleDateChange = date => {
  //   this.setState({
  //     eventDate: date,
  //     displayDate: date
  //   });
  // };

  onClick = e => {
    e.preventDefault();
    console.log("Item list click" + e.currentTarget.catname);

    const eventItem = {
      eventName: e.currentTarget.getAttribute("data-name"),
      userID: this.props.userID,
      eventDate: this.props.displayDate,
      eventQuantity: 1,
      eventPoints: e.currentTarget.getAttribute("data-points"),
      eventCat: e.currentTarget.getAttribute("data-category"),
      eventMonth: moment(this.props.displayDate).format("MM"),
      eventYear: moment(this.props.displayDate).format("YYYY")
    };
    console.log(eventItem);

    axios.post("api/logs", eventItem).then(res => {
      console.log(res.data);
      this.props.getToday();
      this.props.getTodayStats();
      this.props.getMonth();
    });
    document.querySelector(".events__grid-item").scrollTo(0, 0);
  };

  toggle = () => {
    // this.setState ({
    //   dropdownOpen: true
    // });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="events__grid-main">
        <div className="events__grid-item">
          {/* <DatePicker
            className="my-2 w-100 text-center"
            selected={this.state.eventDate}
            onChange={this.handleDateChange}
            includeDates={[new Date(), addDays(new Date(), -1)]}
            dateFormat="MMMM d, yyyy"
            todayButton="Today"
          /> */}

          <ListGroup>
            {this.props.events.map(event => {
              return (
                <ListGroupItem
                  className="event-item"
                  onClick={this.onClick}
                  data-name={event.name}
                  key={event._id}
                  data-category={event.category}
                  data-points={event.points}
                >
                  <div>{event.name}</div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default EventList;
