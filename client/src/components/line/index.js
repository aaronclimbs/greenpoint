import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./style.css";
// import { Form, FormGroup, Label, Row,Col} from "reactstrap";
import { connect } from "react-redux";
import { loadLogs } from "../../actions/doughnutActions";

const setData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

// export default React.createClass({
//   displayName: 'LineExample',

class LineChart extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    // setTimeout(
    //   () =>
    this.setState(
      {
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      () => {
        console.log(this.state.data);
        setData.datasets[0].data = this.state.data;
      }
    );
  }

  render() {
    return (
      <div>
        <h2>Line Example</h2>
        <div className="line_chart">
          <Line data={setData} />
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
)(LineChart);
