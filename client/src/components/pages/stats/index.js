import React, { Component } from "react";
import {Row,Col, Container} from "reactstrap";
import HorizontalChart from '../../horizontalBar'
import axios from "axios";
import "./style.css"


const moment= require("moment")


class Stats extends Component {

  state = {
    displayMonth: moment(new Date).format("MM"),
    displayYear:moment(new Date).format("YYYY"),
    list:[],
        setBarData: {
              labels: [],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: '#13dd68',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: []
                }
              ]
            }

  }




    
    
  monthForward = () => {
    console.log("Date forward clicked")
    var newForwardDate = moment(this.state.displayMonth).add(1, 'months').format("MM")
    console.log("Next month is " + newForwardDate)

    this.setState({
      displayMonth: newForwardDate
     
    })
    
    setTimeout(() => this.loadHS(), 500)
  

  }

  monthBack = () => {
    console.log("Date back clicked")
    var newBackDate = moment(this.state.displayMonth).subtract(1, 'months').format("MM")
    console.log("Next day is " + newBackDate)

    this.setState({
      displayMonth: newBackDate
      
    })

    setTimeout(() => this.loadHS(), 500)


  }



  loadHS = () => {
 console.log("Month and Year is " + this.state.displayMonth + " " + this.state.displayYear)
    
    axios
    .get("api/logs/monthCatStats/"+ this.state.displayMonth+"/" + this.state.displayYear)
    .then(res => {

      console.log(res.data)

      var tempLabels =[]
      var tempStats = []
     

      res.data.map(item => {
              tempLabels.push(item._id)
              tempStats.push(item.count)
            })
      

      

      this.setState({ 
                list: res.data,
                setBarData: {
                    labels: tempLabels,
                    datasets: [
                      {
                        label:"Total Green Points" ,
                        backgroundColor: '#13dd68',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: tempStats
                      }
                    ]
                  }
              })
            })
            .catch(err => console.log(err));
   

  }


  componentDidMount() {


    this.loadHS()

  }


  render() {
   

    return <Container>

      <Row className="justify-content-md-center mb-3 mt-3"> 
      <h3>Leaderboard </h3>
      </Row>
      <Row className="justify-content-md-center">
      <div><i className="fa fa-caret-left fa-2x mr-3" onClick={this.monthBack}></i></div>
      <div><h4>{moment(this.state.displayMonth).format("MMMM") + " " + this.state.displayYear}</h4></div>
      <div><i className="fa fa-caret-right fa-2x ml-3" aria-hidden="true" onClick={this.monthForward}></i></div> 
      </Row>
      <Row>

      <Col md={12} className="mt-3" >
        <Row> </Row>

        <HorizontalChart setBarData={this.state.setBarData}></HorizontalChart>
      </Col>
     </Row>
     </Container>
  }
}

export default (Stats);

