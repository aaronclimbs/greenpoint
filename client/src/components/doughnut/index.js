import React, { Component } from "react";
import {Doughnut} from 'react-chartjs-2';
import "./style.css";
import { Form, FormGroup, Label, Row,Col} from "reactstrap";
import { connect } from "react-redux";
import { loadLogs } from "../../actions/doughnutActions"
import moment from "moment";
import axios from 'axios';
const setData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF7F50", "#0EBFE9"],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#FF7F50",
        "#0EBFE9"
      ]
    }
  ]
};
class DoughnutChart extends Component {
  state = {
    labels: this.props.labels,
    data: this.props.data
  };
  componentDidMount() {

this.props.getTodayStats()
setData.labels = this.state.labels;
setData.datasets[0].data = this.state.data;

    // fetchLogs();
    this.setState(
      // {
      //   labels: ["food", "green action", "lifestyle", "re-use", "transportation"],
      //   data: [3, 14, 2, 0, 23]
      // },
      // () => {
      //   console.log(this.state.data);
      //   setData.labels = this.state.labels;
      //   setData.datasets[0].data = this.state.data;
      // }
    );
    console.log("Labels are " + this.props.labels)
    console.log("Data is" + this.props.data)


    // setData.labels = this.props.labels;
    // setData.datasets[0].data = this.props.data;
       
  }
  render() {
    console.log(setData);
    return (
      <div>
        
        <div className="doughnut_chart">
          <Doughnut data={setData} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
    events: state.events
});
export default connect(
    mapStateToProps,
    { loadLogs }
)(DoughnutChart);