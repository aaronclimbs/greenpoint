import React, { Component } from "react";
import {Doughnut} from 'react-chartjs-2';
import "./style.css";

class DoughnutChart extends Component {
 
  componentDidMount() {

       
  }
  render() {
   
    return (
      <div>
        
        <div >
          <Doughnut width={250} height={350}   options={{
          responsive: true,
          maintainAspectRatio: true,
        }} data={this.props.setData} />
        </div>
      </div>
    );
  }
}

export default (DoughnutChart);