import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, ListGroup, ListGroupItem, Row,Col, Table} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { loadList } from "../../actions/eventActions"

import axios from "axios";
const moment= require("moment")

class DayStats extends Component {



     

     



      componentDidMount() {
        
       
  
      }


      render() {

        return (

<Table>
         
         <thead>
           <tr>
             <th>Event Category</th>
             <th>Event Points</th>
           </tr>
         </thead>
         <tbody>
         {this.props.dayStats.map((item, index) => {
             return(
           <tr>
             
             <td>{item._id}</td>
             <td>{item.totalPoints}</td>
             
           </tr>)
         })}
         </tbody>
       </Table>


        )

    }

      








    }

    export default (DayStats)