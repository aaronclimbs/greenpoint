import React, { Component } from "react";
import { Table} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

class DayStats extends Component {



     

     



      componentDidMount() {
        
       
  
      }


      render() {

        const noDayStats = (
          <div>No results to display</div>
        )

        const dayStats = (
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
           <tr key={index}>
             
             <td>{item._id}</td>
             <td>{item.totalPoints}</td>
             
           </tr>)
         })}
         </tbody>
       </Table>

        )

        return (

<div>
          {this.props.dayStats.length ? dayStats : noDayStats}
        </div>


        )

    }

      








    }

    export default (DayStats)