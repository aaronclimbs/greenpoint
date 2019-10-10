import React, { Component } from "react";
import {Doughnut} from 'react-chartjs-2';
import "./style.css";

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

// export default React.createClass({
//   displayName: 'DoughnutExample',

export default class DoughnutChart extends Component {

  render() {
    return (
      <div>
        <h2>Doughnut Example</h2>
        <div className="doughnut_chart"><Doughnut data={data} /></div>
      </div>
    );
  }
};