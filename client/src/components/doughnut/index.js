import React, { Component } from "react";
import {Doughnut} from 'react-chartjs-2';
import "./style.css";
import { Form, FormGroup, Label, Row,Col} from "reactstrap";
import { connect } from "react-redux";
import { loadLogs } from "../../actions/doughnutActions"

import axios from 'axios';

	// const data = 
// const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm')

const setData = {
  labels: ["re-use", "food", "transportation", "lifestyle", "green action"],
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
    data: []
  };
  // dropdownOpen: false,
  // dropdownValue: "Choose a Green Action",
  // doughnutData: {
  //   labels: ["re-use", "food", "transportation", "lifestyle", "green action"],
  //   datasets: [
  //     {
  //       data: [],
  //       backgroundColor: [
  //         "#FF6384",
  //         "#36A2EB",
  //         "#FFCE56",
  //         "#FF7F50",
  //         "#0EBFE9"
  //       ],
  //       hoverBackgroundColor: [
  //         "#FF6384",
  //         "#36A2EB",
  //         "#FFCE56",
  //         "#FF7F50",
  //         "#0EBFE9"
  //       ]
  //     }
  //   ]
  // },
  // doughnutArray: [],
  // selected: [],
  // startDate: new Date()
  // };

  // fetchLogs = async () => {
  //   const result = await axios.get(`api/logs/:userId${this.state.search}`);
  //   this.setState({ doughnutArray: result.data, error: "" });
  // };

  // onChange = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };

  // handleDateChange = date => {
  //   this.setState({
  //     startDate: date
  //   });
  // };

  // onClick = e => {
  //   console.log(e.target);
  //   console.log(e.currentTarget);
  //   e.preventDefault();
  //     console.log("Item list click" + e.currentTarget.catname)
  //     // console.log("Target is " + JSON.stringify(e.target))
  //     // console.log("Target is " + JSON.stringify(e.currentTarget))
  //     const newSelect = {
  //       id: e.currentTarget.id,
  //       name: e.currentTarget.name,
  //       cat: e.currentTarget.getAttribute('data-category'),
  //       quantity: ""
  //     }
  //   this.setState({
  //       selected: [...this.state.selected, newSelect]
  //   }, () => {
  //       this.setState({
  //           dropdownValue: this.state.selected.length > 0 ? "Choose another Green Action" : "Choose a Green Action"
  //       })
  //   });
  // };

  //   delListItem = e => {
  //     e.preventDefault()
  //     const itemLoc = e.currentTarget.getAttribute("data-id")

  //     const Select = this.state.selected
  //     console.log("Select is " + Select)
  //     const newSelect = Select.splice(itemLoc,1)
  //     console.log("Select is now " + Select )

  //    this.setState({
  //      selected: Select
  //    })
  //   }
  // componentDidUpdate() {

  // }

// console.log(startOfMonth);

  fetchLogs = async () => {
    const result = await axios.get(`api/logs/:userId/${this.state.search}`);
    this.setState({ doughnutArray: result.data, error: "" });
  };


  componentDidMount() {
    // setTimeout(
    //   () =>



    this.setState(
      {
        data: [3, 14, 2, 3, 20]
      },
      () => {
        console.log(this.state.data);
        setData.datasets[0].data = this.state.data;
      }
    );
    //   500
    // );

    // data.datasets.data = this.state.doughnutData;
    // console.log(data.datasets.data);
    // console.log(this.state.doughnutData);
    // const dataWrapper = this.state.doughnutData;
    // console.log(this.state.doughnutData.datasets[0].data);
    // dataWrapper.datasets[0].data = [
    //   ...this.state.doughnutData.datasets[0].data,
    //   12,
    //   3,
    //   45,
    //   60,
    //   20
    // ];
    // console.log(dataWrapper.datasets[0]);
    // this.setState(
    //   {
    //     doughnutData: [dataWrapper]
    //   },
    //   () => console.log(this.state.doughnutData)
    // );
    // this.fetchLogs();
    // this.props.loadLogs();
  }

  // toggle = () => {
  //     this.setState ({
  //       dropdownOpen: !this.state.dropdownOpen
  //     });
  //   }

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

// const mapStateToProps = state => ({
//   events: state.events
// });














const mapStateToProps = state => ({
    events: state.events

});

export default connect(
    mapStateToProps,
    { loadLogs }
)(DoughnutChart);