import React, { Component } from "react";
import {Doughnut, Chart} from 'react-chartjs-2';
import "./style.css";



class DoughnutChart extends Component {

  

  
 
  componentDidMount() {

    var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);
    
    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;

    var fontSize = (height / 250).toFixed(2);
    ctx.font = fontSize + "em Verdana";
    ctx.textBaseline = "middle";

    var text = chart.config.data.points+ " pts",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 1.80;

    ctx.fillText(text, textX, textY);
  }
});

       
  }
  render() {



    

    const noChartData = (
      <div>No results to display</div>
    )

    const chartData = (
      <div>
        
      <div >
        <Doughnut width={250} height={250}   options={{
        responsive: true,
        legend: {display: false},
        maintainAspectRatio: true,
      }}  data={this.props.setData} />
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