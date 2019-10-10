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
    labels: [],
    data: []
  };


  componentDidMount() {

    // fetchLogs();

    this.setState(
      {
        labels: ["food", "green action", "lifestyle", "re-use", "transportation"],
        data: [3, 14, 2, 0, 23]
      },
      () => {
        console.log(this.state.data);
        setData.labels = this.state.labels;
        setData.datasets[0].data = this.state.data;
      }
    );

  }



  render() {
    console.log(setData);
    return (
      <div>
        <h2>Doughnut Example</h2>
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