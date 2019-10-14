import React, { Component } from "react";
import {Doughnut} from 'react-chartjs-2';
import "./style.css";

class DoughnutChart extends Component {
 
  componentDidMount() {

       
  }
  render() {

    const noChartData = (
      <div>No results to display</div>
    )

    const chartData = (
      <div>
        
      <div >
        <Doughnut width={250} height={350}   options={{
        responsive: true,
        maintainAspectRatio: true,
      }} data={this.props.setData} />
      </div>
    </div>

    )
   
    return (

      <div>
      {this.props.setData.labels.length ? chartData : noChartData}
    </div>
   
    );
  }
}

export default (DoughnutChart);