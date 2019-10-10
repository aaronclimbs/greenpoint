import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, ListGroup, ListGroupItem, Row,Col, Table} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { connect } from "react-redux";
import { loadList } from "../../actions/eventActions"

import axios from "axios";
const moment= require("moment")

class EventList extends Component {


    state = {
        dropdownOpen: false,
        dropdownValue:"Choose a Green Action",
        dayEvents: [],
        dayStats:[],
        today:moment(new Date()).format("YYYYMMDD"),
        eventDate: new Date(),
        displayDate: new Date(),
        queryDate: "",
        userID: this.props.userID
      };

      onQuantityChange = e => {
        const itemID = e.currentTarget.getAttribute("data-id")
        const newQuantity = e.currentTarget.value
        console.log("New quantity is " + newQuantity)

        axios
        .put("/api/logs/" + itemID, {eventQuantity: newQuantity})
        .then( res => {
          this.getToday()
          this.getTodayStats()
        })
        
       
      };

      handleDateChange = date => {
        
        this.setState({
          eventDate: date
        });
      };

      handleDetailDateChange = date => {
        
        this.setState({
          displayDate: date,
          queryDate: moment(this.state.displayDate).format("YYYYMMDD")
        });

        this.getDay()
      };

      onClick = e => {
        console.log(e.target);
        console.log(e.currentTarget);
        e.preventDefault();
          console.log("Item list click" + e.currentTarget.catname)
          // console.log("Target is " + JSON.stringify(e.target))
          // console.log("Target is " + JSON.stringify(e.currentTarget))
          const eventItem = {
            eventName: e.currentTarget.name,
            userID:this.props.userID,
            eventDate: moment(this.state.eventDate).format("YYYYMMDD"),
            eventQuantity: 1,
            eventPoints: e.currentTarget.getAttribute('data-points'),
            eventCat: e.currentTarget.getAttribute('data-category')
        
           
          }
          console.log(eventItem)
          
          axios
          .post("api/logs", eventItem)
          .then(res =>
            {console.log(res.data)
         
        })

  
        // this.getToday()
        // this.getTodayStats()
        

      };

      getToday = () =>{
        


        axios
        .get("api/logs/"+ this.props.userID +"/" + this.state.today)
        .then(res => {

          console.log(res.data)
          this.setState({
            dayEvents: res.data
          })
       
        })

      }

      getDay = () =>{
        
        axios
        .get("api/logs/"+ this.props.userID +"/" + this.state.queryDate)
        .then(res => {

          console.log("events for " +moment(this.state.displayDate).format("YYYYMMDD")+ " are " + JSON.stringify(res.data))
          this.setState({
            dayEvents: res.data
          })
       
        })

      }

      getTodayStats = () => {
        axios
        .get("api/logs/group/"+ this.props.userID +"/" + this.state.today)
        .then(res => {

          console.log(res.data)
          this.setState({
            dayStats: res.data
          })
       
        })

      }

      delListItem = e => {
        e.preventDefault()
        const itemID = e.currentTarget.getAttribute("data-id")

        axios
        .delete("/api/logs/" + itemID )
        .then( res => {
          this.getToday()
          this.getTodayStats()
        })
        

      }

      

    componentDidMount() {
      this.getToday();
      this.getTodayStats()

        this.props.loadList()

    }

    toggle = () => {
        this.setState ({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    render() {

        return (

        
        <Form onSubmit={this.onSubmit} className="w-75">
            <div className="mt-3"><h4>Select Event Date</h4>
              </div><DatePicker className="mb-2"
        selected={this.state.eventDate}
        onChange={this.handleDateChange}
      />

           
        <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
         {this.state.dropdownValue}
        </DropdownToggle>
        <DropdownMenu >
          <DropdownItem header>Choose an Event</DropdownItem>
          <DropdownItem divider />
          {this.props.events.events.map(event => {
            
              return  <DropdownItem onClick={this.onClick} name={event.name}  key={event._id} data-category={event.category} data-points={event.points}><div >{event.name}</div></DropdownItem>;

            })}
       
        </DropdownMenu>
        </Dropdown>
        <div className="mt-3"><h4>Select Details Date</h4>
              </div>

        <DatePicker className="mb-2 "
        selected={this.state.displayDate}
        onChange={this.handleDetailDateChange}
      />

        <Table >
         
        <thead>
        <tr className="text-center">My Greeen Events for {moment(this.state.today).format("dddd MMMM Do YYYY")}</tr>
          <tr>
            <th>Event Category</th>
            <th>Event Name</th>
            <th>Event Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {this.state.dayEvents.map((item, index) => {
            return(
          <tr>
            
            <td>{item.eventCat}</td>
            <td>{item.eventName}</td>
            <td>    <Input
            data-id={item._id}
            type="number"
            name="quantity"
            id="quantity"
            defaultValue={item.eventQuantity}
            onChange={this.onQuantityChange}
            
            
            
        />
            </td>
            <td>
            <i className="col icon-remove float-right" data-id={item._id} onClick={this.delListItem}></i>
            </td>
          </tr>)
        })}
        </tbody>
      </Table>

      <Table className="mt-5">
         
         <thead>
         <tr className="text-center pb-2"> My Greeen Points for {moment(this.state.today).format("dddd MMMM Do YYYY")}</tr>
           <tr>
             <th>Event Category</th>
             <th>Event Points</th>
           </tr>
         </thead>
         <tbody>
         {this.state.dayStats.map((item, index) => {
             return(
           <tr>
             
             <td>{item._id}</td>
             <td>{item.totalPoints}</td>
             
           </tr>)
         })}
         </tbody>
       </Table>

        {/* <ListGroup>
          {this.state.selected.map((item, index) => {
            return  <ListGroupItem key={index}> <Row className="">
            <Col md={1}>{index}</Col>  
            <Col md={3}>{item.name} </Col>
            <Col md={3}>Category: {item.category}</Col>
            <Col md={1}>
            
            <Label for="quantity">Quantity</Label>
            </Col>
            <Col md={1}>
            <Input
            type="number"
            name="quantity"
            id="quantity"

            defaultValue="1"
            

            
        /> </Col>
        <Col md={3}>
          <i className="col icon-remove float-right" data-id={index} onClick={this.delListItem}></i>
          </Col>
          </Row>
          </ListGroupItem> 
        
          })}

       

      
        </ListGroup>
        */}


         
        </Form>




          


        )




    }


}












const mapStateToProps = state => ({
    events: state.events,
    auth: state.auth
  


});

export default connect(
    mapStateToProps,
    { loadList }
)(EventList);