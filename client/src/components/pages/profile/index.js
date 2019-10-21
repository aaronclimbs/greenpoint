import React, { Component } from "react";
import { Button, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import EventList from "../../events";
import DayList from "../../daylist";
// import DayStats from "../../daystats";
import DoughnutChart from "../../doughnut";
import { loadList } from "../../../actions/eventActions";
import axios from "axios";
import openSocket from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";


const socket = openSocket("/");

const moment = require("moment");

class Profile extends Component {
  state = {
    dropdownOpen: false,
    dropdownValue: "Choose a Green Action",
    dayEvents: [],
    dayStats: [],
    monthStats: [],
    today: moment(new Date()).format("YYYYMMDD"),
    eventDate: new Date(),
    displayDate: "",
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
    message: "",
    chartLabels: [],
    chartData: [],
    medal: "",
    monthMedal: "",
    setMonthData: {
      labels: [],
      points: "",
      display: false,
      datasets: [
        {
          data: [],

          backgroundColor: ["#234d20", "#36802d", "#77ab59", "#c9df8a ", "#f0f7da"],
          hoverBackgroundColor: ["#234d20", "#36802d", "#77ab59", "#c9df8a", "#f0f7da"]
        }
      ]
    },

    setBarData: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: []
        }
      ]
    },

    setData: {
      labels: [],
      points: "",
      display: true,
      datasets: [
        {
          data: [],

          backgroundColor: ["#234d20", "#36802d", "#77ab59", "#c9df8a ", "#f0f7da"],
          hoverBackgroundColor: ["#234d20", "#36802d", "#77ab59", "#c9df8a", "#f0f7da"]
        }
      ]
    }
  };

  constructor() {
    super();
    this.sendSocketIO = this.sendSocketIO.bind(this);
    this.notify = this.notify.bind(this);
  }

  notify = () => toast(this.state.message);

  dateForward = () => {
    console.log("Date forward clicked");
    var newForwardDate = moment(this.state.displayDate)
      .add(1, "days")
      .format("YYYYMMDD");
    console.log("Next day is " + newForwardDate);

    this.setState({
      displayDate: newForwardDate
    });

    setTimeout(() => this.getToday(), 500);
    setTimeout(() => this.getTodayStats(), 500);
    setTimeout(() => this.getMonth(), 500);
  };

  dateBack = () => {
    console.log("Date back clicked");
    var newBackDate = moment(this.state.displayDate)
      .subtract(1, "days")
      .format("YYYYMMDD");
    console.log("Next day is " + newBackDate);

    this.setState({
      displayDate: newBackDate
    });

    setTimeout(() => this.getToday(), 500);
    setTimeout(() => this.getTodayStats(), 500);
    setTimeout(() => this.getMonth(), 500);
  };

  getToday = () => {
    console.log("Display date in get today is " + this.state.displayDate);
    axios.get("api/logs/" + this.props.auth.user._id + "/" + this.state.displayDate).then(res => {
      console.log(res.data);
      this.setState({
        dayEvents: res.data
      });
    });
  };

  getMonth = () => {
    axios
      .get(
        "api/logs/month/" + this.props.auth.user._id + "/" + parseInt(moment(this.state.displayDate).format("MM")) + "/" + parseInt(moment(this.state.displayDate).format("YYYY"))
      )
      .then(res => {
        var tempMonthLabels = [];
        var tempMonthStats = [];
        var tempMonthPoints = 0;
        var tempMonthMedal = "";

        res.data.forEach(item => {
          tempMonthLabels.push(item._id);
          tempMonthStats.push(item.totalPoints);
        });

        if (tempMonthStats.length) {
          tempMonthPoints = tempMonthStats.reduce(sumPts);
        } else {
          tempMonthPoints = 0;
        }

        console.log("Points are " + tempMonthPoints + Notification(tempMonthPoints));
        function Notification(input) {
          switch (true) {
            case input >= 1 && input <= 100:
              console.log("Chocolate Medal");
              return (tempMonthMedal = "🎖	Chocolate Medal");
            case input >= 101 && input <= 200:
              console.log("Bronze Medal");
              return (tempMonthMedal = "🥉 Bronze Medal");
            case input >= 201 && input <= 300:
              console.log("Silver Medal");
              return (tempMonthMedal = "🥈	Silver Medal");
            case input >= 301 && input <= 1000:
              console.log("Gold Medal");
              return (tempMonthMedal = "🏆	Gold Medal");
            default:
              return null;
          }
        }

        // Notification(tempPoints)
        function sumPts(total, num) {
          return total + num;
        }

        console.log(res.data);
        this.setState({
          monthStats: res.data,
          monthMedal: tempMonthMedal,
          setMonthData: {
            labels: tempMonthLabels,
            points: tempMonthPoints || 0,
            display: false,
            datasets: [
              {
                data: tempMonthStats,

                backgroundColor: ["#234d20", "#36802d", "#77ab59", "#c9df8a ", "#f0f7da"],
                hoverBackgroundColor: ["#234d20", "#36802d", "#77ab59", "#c9df8a", "#f0f7da"]
              }
            ]
          }
        });
      });
  };

  getTodayStats = () => {
    axios.get("api/logs/group/" + this.props.auth.user._id + "/" + this.state.displayDate).then(res => {
      var tempLabels = [];
      var tempStats = [];
      var tempPoints = 0;
      var tempMedal = "";

      res.data.forEach(item => {
        tempLabels.push(item._id);
        tempStats.push(item.totalPoints);
      });

      if (tempStats.length) {
        tempPoints = tempStats.reduce(sumPts);
      } else {
        tempPoints = 0;
      }

      console.log("Points are " + tempPoints + Notification(tempPoints));
      function Notification(input) {
        switch (true) {
          case input >= 1 && input <= 100:
            console.log("Chocolate Medal");
            return (tempMedal = "🎖	Chocolate Medal");
          case input >= 101 && input <= 200:
            console.log("Bronze Medal");
            return (tempMedal = "🥉 Bronze Medal");
          case input >= 201 && input <= 300:
            console.log("Silver Medal");
            return (tempMedal = "🥈	Silver Medal");
          case input >= 301 && input <= 1000:
            console.log("Gold Medal");
            return (tempMedal = "🏆	Gold Medal");
          default:
            return null;
        }
      }

      // Notification(tempPoints)
      function sumPts(total, num) {
        return total + num;
      }

      console.log(res.data);
      this.setState({
        dayStats: res.data,
        medal: tempMedal,
        setData: {
          labels: tempLabels,
          points: tempPoints || 0,
          display: true,
          datasets: [
            {
              data: tempStats,

              backgroundColor: ["#234d20", "#36802d", "#77ab59", "#c9df8a ", "#f0f7da"],
              hoverBackgroundColor: ["#234d20", "#36802d", "#77ab59", "#c9df8a", "#f0f7da"]
            }
          ]
        }
      });
    });
  };

  sendSocketIO(msg) {
    socket.emit("Test", msg);
  }

  componentDidMount() {
    this.props.loadList();

    this.setState({
      displayDate: moment(new Date()).format("YYYYMMDD")
    });

    setTimeout(() => this.getToday(), 500);
    setTimeout(() => this.getTodayStats(), 500);
    setTimeout(() => this.getMonth(), 500);
  }

  render() {
    return (
      <Container>
        <ToastContainer />
        <div className="profile__header-main">
          <h4>Welcome to your Green Dashboard, {this.props.auth.user.name} </h4>
        </div>

        {/* <div className="profile__date-main">
          <div>
            <i className="fa fa-caret-left fa-2x mr-3" onClick={this.dateBack}></i>
          </div>
          <div>{moment(this.state.displayDate).format("dddd MMMM Do, YYYY")}</div>
          <div>
            <i className="fa fa-caret-right fa-2x ml-3" aria-hidden="true" onClick={this.dateForward}></i>
          </div>
        </div> */}
        <div className="profile__grid-container">
          <div className="profile__eventlist">
            <h5>Add Green Events</h5>
            <Row className="justify-content-md-center">
            <div>
            <i className="fa fa-caret-left fa-2x mr-3" onClick={this.dateBack}></i>
          </div>
          <div><h5>{moment(this.state.displayDate).format("dddd MMMM Do, YYYY")}</h5></div>
          <div>
            <i className="fa fa-caret-right fa-2x ml-3" aria-hidden="true" onClick={this.dateForward}></i>
          </div>
          </Row>
            <EventList
              getToday={this.getToday}
              getTodayStats={this.getTodayStats}
              getMonth={this.getMonth}
              events={this.props.events.events}
              userID={this.props.auth.user._id}
              displayDate={this.state.displayDate}
            />
          </div>

          <div className="profile__myevents">
            <h5>My Green Events </h5>
            <DayList
              getToday={this.getToday}
              getTodayStats={this.getTodayStats}
              today={this.state.today}
              dayEvents={this.state.dayEvents}
              getMonth={this.getMonth}
              userID={this.props.auth.user._id}
            />
          </div>

          <div className="profile__doughnut-day">
            <h5>{this.state.medal ? `Today you've earned a ${this.state.medal}` : `No points yet`}</h5>
            <DoughnutChart setData={this.state.setData}></DoughnutChart>
          </div>
          <div className="profile__high-scores">
            <Button outline={true} block={true} color="success" className="text-center mt-5" href="/stats">
              View High Scores
            </Button>
          </div>

          <div className="profile__doughnut-month">
            <h5>
              {this.state.monthMedal
                ? "This " +
                  moment(this.state.displayDate).format("MMMM") +
                  " you have earned a " +
                  this.state.monthMedal
                : `No points yet`}
            </h5>
            <DoughnutChart options={this.state.setMonthData} setData={this.state.setMonthData}></DoughnutChart>
          </div>
        </div>
        <div>
         
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { events: state.events, auth: state.auth };
};

export default connect(
  mapStateToProps,
  { loadList }
)(Profile);
