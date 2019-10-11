import React, { Component } from "react";
import {  Input, Table} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./style.css"

class DayList extends Component {



     

      onQuantityChange = e => {
        const itemID = e.currentTarget.getAttribute("data-id")
        const newQuantity = e.currentTarget.value
        console.log("New quantity is " + newQuantity)

        axios
        .put("/api/logs/" + itemID, {eventQuantity: newQuantity})
        .then( res => {
          this.props.getToday()
          this.props.getTodayStats()
         
        })
        
       
      };

      delListItem = e => {
        e.preventDefault()
        const itemID = e.currentTarget.getAttribute("data-id")

        axios
        .delete("/api/logs/" + itemID )
        .then( res => {
          this.props.getToday()
          this.props.getTodayStats()
        })
        

      }



      componentDidMount() {
        
       
  
      }


      render() {

        return (

        
       
            
            <div className="day-list">
        <Table hover size="md" bordered striped="true" className="day-list" modifiers={{
            setMaxHeight: {
                enabled: true,
                order:890,
                fn: (data) => {
                    return {
                        ...data,
                        styles: {
                            overflow:"auto",
                            Height: 100
                        }
                    }
                }

            }
        }} >     
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        
        <tbody >
            
        {this.props.dayEvents.map((item, index) => {
            return(
          <tr>
            
            <td>{item.eventCat}</td>
            <td>{item.eventName}</td>
            <td>    <Input
            data-id={item._id}
            size="1"
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
      </div>


        )

    }

      








    }

    export default (DayList)