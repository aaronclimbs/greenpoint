import React, { Component } from "react";
import {Row,Col, Container} from "reactstrap";
import { connect } from "react-redux";
import EventList from '../events'
import DayList from '../daylist'
import DayStats from '../daystats'
import DoughnutChart from '../doughnut'
import { loadList } from "../../actions/eventActions"
import axios from "axios";
import openSocket from 'socket.io-client'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const socket =openSocket('/')

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
    message:"",
    chartLabels:[],
    chartData:[]
    
  };

  constructor() {
    super()
    this.sendSocketIO = this.sendSocketIO.bind(this);
    this.notify = this.notify.bind(this);
   
}

notify = () => toast(this.state.message)
    
    
  

  getToday = () =>{
    axios
    .get("api/logs/"+ this.props.auth.user._id +"/" + this.state.today)
    .then(res => {

      console.log(res.data)

    

      this.setState({
        dayEvents: res.data,

      })
   
    })

  }

  getTodayStats = () => {
    axios
    .get("api/logs/group/"+ this.props.auth.user._id +"/" + this.state.today)
    .then(res => {

      console.log(res.data)

      const tempLabels = this.state.chartLabels
      const tempChartData = this.state.chartData

      res.data.forEach(storeChart)
     

      function storeChart (item) {
        tempLabels.push(item._id);
        tempChartData.push(item.totalPoints)

      }

      this.setState({
        dayStats: res.data,
        chartLabels: tempLabels,
        chartData: tempChartData
      })
   
    })

  }


  sendSocketIO(msg) {
    socket.emit('Test', msg);
    
}  


  componentDidMount() {
   
    this.props.loadList()
    this.getToday()
    this.getTodayStats()

    socket.on("Weather", data => {
      console.log(data)
      this.setState({
        message:"The temperature in DC is currently " + Math.round(data) + "\xB0"
      })

      this.notify()
    })

    

  }


  render() {

    return <Container>
       <ToastContainer />
      <Row className="justify-content-md-center mb-3 mt-3"> <h4 >Welcome to your Green Dashboard for {moment(this.state.today).format("dddd MMMM Do YYYY")}, {this.props.auth.user.name}</h4></Row>
      <Row >
        <Col md={3} className="text-center"><h5>Add Green Events</h5>
        <EventList getToday={this.getToday} getTodayStats={this.getTodayStats} events={this.props.events.events} userID={this.props.auth.user._id}/>
        </Col>

        <Col md={6} className="text-center"><h5>My Greeen Events </h5>
        <DayList getToday={this.getToday} getTodayStats={this.getTodayStats} today={this.state.today} dayEvents={this.state.dayEvents} userID={this.props.auth.user._id}/>
        </Col>

        <Col md={3} className="text-center"><h5>My Greeen Points</h5>
        <DoughnutChart labels={this.state.chartLabels} data={this.state.chartData} getTodayStats={this.getTodayStats}></DoughnutChart>
        </Col>
       {/* <DayStats getTodayStats={this.getTodayStats} today={this.state.today} dayStats={this.state.dayStats} userID={this.props.auth.user._id}/> */}
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