import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, ListGroup, ListGroupItem, Row,Col, Table} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./style.css"

const moment= require("moment")

class EventList extends Component {

    state = {
        dropdownOpen: true,
        dropdownValue:"Choose a Green Action",
        eventDate: new Date(),
        displayDate: new Date(),
        queryDate: ""
      };

   
      handleDateChange = date => {    
        this.setState({
          eventDate: date
        });
      };


      onClick = e => {
       
        e.preventDefault();
          console.log("Item list click" + e.currentTarget.catname)
       
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
                this.props.getToday()
                this.props.getTodayStats()
         
        })        
      };

      toggle = () => {
        this.setState ({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
      

    componentDidMount() {
      
      
    }

  

    render() {

        return (

        
        <div>
        <div className="mt-3"><h4>Select Event Date</h4>
        </div><DatePicker className="mb-2"
        selected={this.state.eventDate}
        onChange={this.handleDateChange} 
        inline/>     
        <Dropdown size="lg"   isOpen={this.state.dropdownOpen} toggle={this.toggle} >

        <DropdownToggle caret>
         {this.state.dropdownValue}
        </DropdownToggle>

        <DropdownMenu left modifiers={{
            setMaxHeight: {
                enabled: true,
                order:890,
                fn: (data) => {
                    return {
                        ...data,
                        styles: {
                            overflow:"auto",
                            maxHeight: 200,
                            maxWidth: 250
                        }
                    }
                }

            }
        }}>
          {this.props.events.map(event => {
            
              return  <DropdownItem className="event-items" onClick={this.onClick} name={event.name}  key={event._id} data-category={event.category} data-points={event.points}><div >{event.name}</div></DropdownItem>;

            })}
        </DropdownMenu>
        </Dropdown>
        </div>

        )

    }

}


export default (EventList);