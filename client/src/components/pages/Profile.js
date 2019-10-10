import React, { Component } from "react";
import {Row,Col, Container} from "reactstrap";
import { connect } from "react-redux";
import EventList from '../events'
import DayList from '../daylist'
import DayStats from '../daystats'
import { loadList } from "../../actions/eventActions"
import axios from "axios";
const moment= require("moment")


class Profile extends Component {

  state = {
    dropdownOpen: false,
    dropdownValue:"Choose a Green Action",
    dayEvents: [],
    dayStats:[],
    today:moment(new Date()).format("YYYYMMDD"),
    eventDate: new Date(),
    displayDate: new Date(),
    queryDate: "",
    
  };

  getToday = () =>{
    axios
    .get("api/logs/"+ this.props.auth.user._id +"/" + this.state.today)
    .then(res => {

      console.log(res.data)
      this.setState({
        dayEvents: res.data
      })
   
    })

  }

  getTodayStats = () => {
    axios
    .get("api/logs/group/"+ this.props.auth.user._id +"/" + this.state.today)
    .then(res => {

      console.log(res.data)
      this.setState({
        dayStats: res.data
      })
   
    })

  }





  componentDidMount() {
   
    this.props.loadList()
    this.getToday()
    this.getTodayStats()

  }


  render() {

    return <Container>
      <Row className="justify-content-md-center mb-3 mt-3"> <h4 >Welcome to your Green Dashboard for {moment(this.state.today).format("dddd MMMM Do YYYY")}, {this.props.auth.user.name}</h4></Row>
      <Row >
        <Col md={3} className="text-center"><h5>Add Green Events</h5>
        <EventList getToday={this.getToday} getTodayStats={this.getTodayStats} events={this.props.events.events} userID={this.props.auth.user._id}/>
        </Col>

        <Col md={6} className="text-center"><h5>My Greeen Events </h5>
        <DayList getToday={this.getToday} getTodayStats={this.getTodayStats} today={this.state.today} dayEvents={this.state.dayEvents} userID={this.props.auth.user._id}/>
        </Col>

        <Col md={3} className="text-center"><h5>My Greeen Points</h5>
       <DayStats getTodayStats={this.getTodayStats} today={this.state.today} dayStats={this.state.dayStats} userID={this.props.auth.user._id}/>
        </Col>

      </Row>

   
    </Container>
  }
}

const mapStateToProps = state => {
  return { events: state.events,
           auth: state.auth };
};

export default connect(
  mapStateToProps,
  { loadList }
)(Profile);