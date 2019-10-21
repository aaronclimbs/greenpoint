import React, { Component }  from 'react';
import {HorizontalBar} from 'react-chartjs-2';

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: 'rgba(255,99,132,0.2)',
//       borderColor: 'rgba(255,99,132,1)',
//       borderWidth: 1,
//       hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//       hoverBorderColor: 'rgba(255,99,132,1)',
//       data: [65, 59, 80, 81, 56, 55, 40]
//     }
//   ]
// };

class HorizontalChart extends Component{


  render() {

    const noChartData = (
      <div>No results to display</div>
    )

    const chartData = (
      <div>
        
      <div >
        <HorizontalBar width={250} height={250}   options={{
        responsive: true,
        maintainAspectRatio: false,
      }} data={this.props.setBarData} />
      </div>
    </div>

    )



    return (
      <div>
      {this.props.setBarData.labels.length ? chartData : noChartData}
          {/* <div className="horizontalBar_chart"><HorizontalBar data={this.props.setBarData} /></div> */}
      </div>
    );
  }

}


export default (HorizontalChart)