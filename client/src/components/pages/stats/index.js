import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap";
import HorizontalChart from "../../horizontalBar";
import axios from "axios";
import "./style.css";

const moment = require("moment");

class Stats extends Component {
  state = {
    displayMonth: moment(new Date()).format("MM"),
    displayYear: moment(new Date()).format("YYYY"),
    categories: [
      "re-use",
      "green_action",
      "food",
      "lifestyle",
      "transportation"
    ],
    transportation: [],
    green_action: [],
    food: [],
    lifestyle: [],
    "re-use": [],
    monthTotal: "",
    yearTotal: "",
    list: [],
    setBarData: {
      labels: [],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "#13dd68",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: []
        }
      ]
    }
  };

  monthForward = () => {
    console.log("Date forward clicked");
    var newForwardMonth = moment(this.state.displayMonth)
      .add(1, "months")
      .format("MM");
    console.log("Next month is " + newForwardMonth);

    if (this.state.displayMonth === "12") {
      var newForwardYear = parseInt(this.state.displayYear) + 1;
      console.log("New year is " + newForwardYear);
      this.setState({
        displayYear: newForwardYear
      });
    }

    this.setState({
      displayMonth: newForwardMonth
    });

    setTimeout(() => this.loadHS(), 500);
    setTimeout(() => this.loadCatHighScores(), 500);
    setTimeout(() => this.loadMonthSiteTotal(), 500);
    setTimeout(() => this.loadYearSiteTotal(), 500);
  };

  monthBack = () => {
    console.log("Date back clicked");

    if (this.state.displayMonth === "01") {
      var newBackYear = this.state.displayYear - 1;
      console.log("New year is " + newBackYear);

      this.setState({
        displayYear: newBackYear
      });
    }

    var newBackMonth = moment(this.state.displayMonth)
      .subtract(1, "months")
      .format("MM");
    console.log("Next day is " + newBackMonth);

    this.setState({
      displayMonth: newBackMonth
    });

    setTimeout(() => this.loadHS(), 500);
    setTimeout(() => this.loadCatHighScores(), 500);
    setTimeout(() => this.loadMonthSiteTotal(), 500);
    setTimeout(() => this.loadYearSiteTotal(), 500);
  };

  loadMonthSiteTotal = () => {
    axios
      .get(
        "api/logs/monthSiteTotal/" +
          this.state.displayMonth +
          "/" +
          this.state.displayYear
      )
      .then(res => {
        if (!res.data.length) {
          this.setState({
            monthTotal: 0
          });
        } else {
          this.setState({
            monthTotal: res.data[0].count
          });
        }
      })
      .catch(err => console.log(err));
  };

  loadYearSiteTotal = () => {
    axios
      .get("api/logs/group/year/SiteTotal/" + this.state.displayYear)
      .then(res => {
        if (!res.data.length) {
          this.setState({
            yearTotal: 0
          });
        } else {
          this.setState({
            yearTotal: res.data[0].count
          });
        }
      })
      .catch(err => console.log(err));
  };

  loadCatHighScores = () => {
    for (let i = 0; i < this.state.categories.length; i++) {
      axios
        .get(
          "/api/logs/monthCatStatsTotal/" +
            this.state.categories[i] +
            "/" +
            this.state.displayMonth +
            "/" +
            this.state.displayYear
        )
        .then(res => {
          var tempCatHolder = [];

          tempCatHolder = this.state.categories[i];

          console.log(
            "Results for " + this.state.categories[i] + " " + res.data
          );

          this.setState({
            [tempCatHolder]: res.data
          });
        })
        .catch(err => console.log(err));
    }
  };

  loadHS = () => {
    console.log(
      "Month and Year is " +
        this.state.displayMonth +
        " " +
        this.state.displayYear
    );

    axios
      .get(
        "api/logs/monthUserTotal/" +
          this.state.displayMonth +
          "/" +
          this.state.displayYear
      )
      .then(res => {
        console.log(res.data);

        var tempLabels = [];
        var tempStats = [];

        res.data.forEach(item => {
          tempLabels.push(item._id);
          tempStats.push(item.count);
        });

        this.setState({
          list: res.data,
          setBarData: {
            labels: tempLabels,
            datasets: [
              {
                label: "Total Green Points",
                backgroundColor: "#13dd68",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: tempStats
              }
            ]
          }
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadHS();
    this.loadCatHighScores();
    this.loadMonthSiteTotal();
    this.loadYearSiteTotal();
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center mb-3 mt-3">
          <h3 className="top-heading">Leaderboard </h3>
        </Row>

        <Row className="justify-content-md-center">
          <div>
            <i
              className="fa fa-caret-left fa-2x mr-3"
              onClick={this.monthBack}
            ></i>
          </div>
          <div>
            <h4 className="stats-h4">
              {moment(this.state.displayMonth).format("MMMM") +
                " " +
                this.state.displayYear}
            </h4>
          </div>
          <div>
            <i
              className="fa fa-caret-right fa-2x ml-3"
              aria-hidden="true"
              onClick={this.monthForward}
            ></i>
          </div>
        </Row>
        <hr className="stats-hr" />
        <Row className="mt-3">
          <Col md={6}>
            <Row className="justify-content-md-center ">
              <h6 className="top-heading">Top 10 this Month</h6>
            </Row>
            <HorizontalChart
              setBarData={this.state.setBarData}
            ></HorizontalChart>
          </Col>
          <Col md={3}>
            <Row className="justify-content-md-center">
              <Col md={12}>
                <Row className="justify-content-md-center">
                  <h6 className="top-heading">Total Site Points this Month</h6>
                </Row>
              </Col>
              <Col md={12}>
                <Row className="justify-content-md-center mt-5">
                  <h3 className="points">{this.state.monthTotal} pts</h3>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <Row className="justify-content-md-center">
              <Col md={12}>
                <Row className="justify-content-md-center">
                  <h6 className="top-heading">Total Site Points this Year</h6>
                </Row>
              </Col>
              <Col md={12}>
                <Row className="justify-content-md-center mt-5">
                  <h3 className="points">{this.state.yearTotal} pts</h3>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3 justify-content-md-center mt-2 mb-2">
          <h4>Leaders by Category</h4>
        </Row>
        <hr className="stats-hr" />
        <Row>
          <Col md={4}>
            <Row className="justify-content-center">
              <div className="float-left text-center floatdown ml-4">
                <img src="../images/food.jpg" alt="thumb-food" />
                <div className="mb-2 cat-heading">Food</div>

                <ListGroup className="text-left">
                  {this.state.food.map((item, index) => {
                    return (
                      <ListGroupItem
                        key={"food" + index}
                        className="list-border"
                      >
                        <div>
                          {index + 1}. {item._id} :{" "}
                          <Badge pill className="list-pill">
                            {item.count} pts
                          </Badge>
                        </div>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </div>
            </Row>
          </Col>
          <Col md={4} className="w-75">
            <Row className="justify-content-center">
              <div className="float-left text-center floatdown ml-4">
                <img src="../images/greenaction.jpg" alt="thumb-green-action" />
                <div className="mb-2 cat-heading">Green Action</div>

                <ListGroup className="text-left">
                  {this.state.green_action.map((item, index) => {
                    return (
                      <ListGroupItem
                        key={"greenaction" + index}
                        className="list-border"
                      >
                        <div>
                          {index + 1}. {item._id} :{" "}
                          <Badge pill className="list-pill">
                            {" "}
                            {item.count} pts
                          </Badge>
                        </div>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </div>
            </Row>
          </Col>
          <Col md={4} className="w-75">
            <Row className="justify-content-center">
              <div className="float-left text-center floatdown ml-4">
                <img src="../images/lifestyle.jpg" alt="thumb-liefstyle" />
                <div className="mb-2 cat-heading">Lifestyle</div>

                <ListGroup className="text-left">
                  {this.state.lifestyle.map((item, index) => {
                    return (
                      <ListGroupItem
                        key={"lifestyle" + index}
                        className="list-border"
                      >
                        <div>
                          {index + 1}. {item._id} :{" "}
                          <Badge pill className="list-pill">
                            {" "}
                            {item.count} pts
                          </Badge>
                        </div>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </div>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={3}></Col>
          <Col md={3}>
            <Row className="justify-content-center">
              <div className="float-left text-center floatdown ml-4">
                <img src="../images/recycle.jpg" alt="thumb-reuse" />
                <div className="mb-2 cat-heading">Re Use</div>

                <ListGroup className="text-left">
                  {this.state["re-use"].map((item, index) => {
                    return (
                      <ListGroupItem
                        key={"reuse" + index}
                        className="list-border"
                      >
                        <div>
                          {index + 1}. {item._id} :{" "}
                          <Badge pill className="list-pill">
                            {item.count} pts
                          </Badge>
                        </div>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </div>
            </Row>
          </Col>
          <Col md={3}>
            <Row className="justify-content-center">
              <div className="float-left text-center floatdown ml-4">
                <img src="../images/food.jpg" alt="thumb-food" />
                <div className="mb-2 cat-heading">Transportation</div>

                <ListGroup className="text-left">
                  {this.state.transportation.map((item, index) => {
                    return (
                      <ListGroupItem
                        key={"trans" + index}
                        className="list-border"
                      >
                        <div>
                          {index + 1}. {item._id} :{" "}
                          <Badge pill className="list-pill">
                            {" "}
                            {item.count} pts{" "}
                          </Badge>
                        </div>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </div>
            </Row>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    );
  }
}

export default Stats;
