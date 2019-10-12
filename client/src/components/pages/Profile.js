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
import "./profile.css"

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
    chartData:[],
    setData: {
              labels:[],
              datasets:[{
                data: [],
                backgroundColor: ["#234d20", "#36802d", "#77ab59", "#c9df8a ", "#f0f7da"],
                hoverBackgroundColor: [
                  "#234d20",
                  "#36802d",
                  "#77ab59",
                  "#c9df8a",
                  "#f0f7da"
              ]}]
            }
    
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
        dayEvents: res.data
        
      })
   
    })

  }

  getTodayStats = () => {
    axios
    .get("api/logs/group/"+ this.props.auth.user._id +"/" + this.state.today)
    .then(res => {
      var tempLabels =[]
      var tempStats = []

      res.data.map(item => {
        tempLabels.push(item._id)
        tempStats.push(item.totalPoints)

      })

      console.log(res.data)
      this.setState({
        dayStats: res.data,
        setData:{
          labels:tempLabels,
          datasets:[{
            data: tempStats,
       }]

        }
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
      <Row className="justify-content-md-center mb-3 mt-3"> <h4 >Welcome to your Green Dashboard for {moment(this.state.today).format("dddd MMMM Do YYYY")} </h4>
      <Col md={12} className="mt-3" >
        <Row className="justify-content-md-center">
        <div className="float-left text-center "> <img src="../images/recycle.jpg"/><div>Re Use</div> </div>
      <div className="float-left text-center ml-5"> <img src="../images/greenaction.jpg"/><div>Green Action</div></div>
      <div className="float-left text-center ml-5"> <img src="../images/lifestyle.jpg"/><div>Lifestyle</div></div>
      <div className="float-left text-center ml-5"> <img src="../images/transportation.jpg"/><div>Transportation</div></div>
      <div className="float-left text-center ml-5"> <img src="../images/food.jpg"/><div>Food</div></div>
        </Row>
    
      </Col>
      </Row>
     
      <Row className="mt-3">
        <Col md={3} className="text-center"><h5>Add Green Events</h5>
        <EventList getToday={this.getToday} getTodayStats={this.getTodayStats} events={this.props.events.events} userID={this.props.auth.user._id}/>
        </Col>

        <Col md={6} className="text-center"><h5>My Green Events </h5>
        <DayList getToday={this.getToday} getTodayStats={this.getTodayStats} today={this.state.today} dayEvents={this.state.dayEvents} userID={this.props.auth.user._id}/>
        </Col>

        <Col md={3} className="text-center"><h5>My Green Points</h5>
        <DoughnutChart setData={this.state.setData}></DoughnutChart>
       
        </Col>

      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={6}></Col>
        <Col md={3}>
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