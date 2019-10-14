import React, { Component } from "react";
import {Row,Col, Container} from "reactstrap";
import { connect } from "react-redux";
import EventList from '../../events'
import DayList from '../../daylist'
import DayStats from '../../daystats'
import DoughnutChart from '../../doughnut'
import { loadList } from "../../../actions/eventActions"
import axios from "axios";
import openSocket from 'socket.io-client'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./style.css"

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
    displayDate: "",
    queryDate: "",
    message:"",
    chartLabels:[],
    chartData:[],
    medal:"",
    setData: {
              labels:[],
              points:"",
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
    
    
  dateForward = () => {
    console.log("Date forward clicked")
    var newForwardDate = moment(this.state.displayDate).add(1, 'days').format("YYYYMMDD")
    console.log("Next day is " + newForwardDate)

    this.setState({
      displayDate: newForwardDate
     
    })
    
    setTimeout(() => this.getToday(), 500)
    setTimeout(() => this.getTodayStats(), 500)
  

  }

  dateBack = () => {
    console.log("Date back clicked")
    var newBackDate = moment(this.state.displayDate).subtract(1, 'days').format("YYYYMMDD")
    console.log("Next day is " + newBackDate)

    this.setState({
      displayDate: newBackDate
      
    })

    setTimeout(() => this.getToday(), 500)
    setTimeout(() => this.getTodayStats(), 500)

  }

  getToday = () =>{
    console.log("Display date in get today is " + this.state.displayDate)
    axios
    .get("api/logs/"+ this.props.auth.user._id +"/" + this.state.displayDate)
    .then(res => {

      console.log(res.data)
      this.setState({
        dayEvents: res.data
        
      })
   
    })

  }


  getTodayStats = () => {
    axios
    .get("api/logs/group/"+ this.props.auth.user._id +"/" + this.state.displayDate)
    .then(res => {
      var tempLabels =[]
      var tempStats = []
      var tempPoints =""

      res.data.map(item => {
        tempLabels.push(item._id)
        tempStats.push(item.totalPoints)

      })

      if (tempStats.length) {tempPoints = tempStats.reduce(sumPts)} else { tempPoints =0}

      console.log("Points are " + tempPoints + Notification(tempPoints))
         function Notification(input) {
            switch(true) {
              case ((input >= 1) && (input <= 100)):
                return console.log("Bronze Medal");
              case ((input >= 101) && (input <= 200)):
                return console.log("Silver Medal");
              case ((input >= 201) && (input <= 1000)):
                return console.log("Gold Medal");
              default:
                return null;
            }
          };

      // Notification(tempPoints)
      function sumPts(total, num) {
        return total + num
      }

      console.log(res.data)
      this.setState({
        dayStats: res.data,
        setData:{
          labels:tempLabels,
          points: tempPoints || 0,
          datasets:[{
            data: tempStats,
            
            backgroundColor: ["#234d20", "#36802d", "#77ab59", "#c9df8a ", "#f0f7da"],
      hoverBackgroundColor: [
        "#234d20",
        "#36802d",
        "#77ab59",
        "#c9df8a",
        "#f0f7da"
    ]
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

    this.setState({
      displayDate: moment(new Date()).format("YYYYMMDD"),
    })


    setTimeout(() => this.getToday(), 500)
    setTimeout(() => this.getTodayStats(), 500)
   
    
  

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
      <Row className="justify-content-md-center mb-3 mt-3"> <h4 >Welcome to your Green Dashboard, {this.props.auth.user.name} </h4>
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
      <Row className="justify-content-md-center">
        <div><i className="fa fa-caret-left fa-2x mr-3" onClick={this.dateBack}></i></div>
        <div> Displaying data for {moment(this.state.displayDate).format("dddd MMMM Do, YYYY")}</div>
        <div><i className="fa fa-caret-right fa-2x ml-3" aria-hidden="true" onClick={this.dateForward}></i></div>
      
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