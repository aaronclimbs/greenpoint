import React, { Component } from "react";
import { Input, Table } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./style.css";

class DayList extends Component {
  onQuantityChange = e => {
    const itemID = e.currentTarget.getAttribute("data-id");
    const newQuantity = e.currentTarget.value;
    console.log("New quantity is " + newQuantity);

    axios.put("/api/logs/" + itemID, { eventQuantity: newQuantity }).then(res => {
      this.props.getToday();
      this.props.getTodayStats();
      this.props.getMonth();
    });
  };

  delListItem = e => {
    e.preventDefault();
    const itemID = e.currentTarget.getAttribute("data-id");

    axios.delete("/api/logs/" + itemID).then(res => {
      this.props.getToday();
      this.props.getTodayStats();
      this.props.getMonth();
    });
  };

  getIcon = cat => {
    var catIcon = "";
    switch (cat) {
      case "re-use":
        catIcon = "../images/recycle.jpg";

        break;
      case "transportation":
        catIcon = "../images/transportation.jpg";
        break;
      case "food":
        catIcon = "../images/food.jpg";
        break;
      case "lifestyle":
        catIcon = "../images/lifestyle.jpg";

        break;
      case "green_action":
        catIcon = "../images/greenaction.jpg";
        break;

      default:
        catIcon = "../images/recycle.jpg";
    }
    return catIcon;
  };

  getCatColor = cat => {
    var catColor = "";
    switch (cat) {
      case "re-use":
        catColor = "recycle";

        break;
      case "transportation":
        catColor = "transportation";
        break;
      case "food":
        catColor = "food";
        break;
      case "lifestyle":
        catColor = "lifestyle";

        break;
      case "green_action":
        catColor = "green_action";
        break;

      default:
        catColor = "recycle";
    }
    return catColor;
  };

  componentDidMount() {}

  render() {
    const noDayData = <div>No results to display</div>;

    const dayData = (
      <div className="day-list">
        <Table
          hover
          size="md"
          bordered
          className="day-list"
          // modifiers={{
          //   setMaxHeight: {
          //     enabled: true,
          //     order: 890,
          //     fn: data => {
          //       return {
          //         ...data,
          //         styles: {
          //           overflow: "auto",
          //           Height: 100
          //         }
          //       };
          //     }
          //   }
          // }}
        >
          <thead className="day-list-header">
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this.props.dayEvents.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="day-list-cat-cell">
                    <div className="pb-0 mb-0">
                      <img
                        className="day-list-icon"
                        alt={"day-icon-" + item.eventCat}
                        src={this.getIcon(item.eventCat)}
                      />
                    </div>
                    <div className={this.getCatColor(item.eventCat)}></div>
                  </td>
                  <td>{item.eventName}</td>
                  <td className="day-list-quantity">
                    <Input
                      data-id={item._id}
                      type="number"
                      name="quantity"
                      id="quantity"
                      defaultValue={item.eventQuantity}
                      onChange={this.onQuantityChange}
                    />
                  </td>
                  <td>
                    <i
                      className="col fa fa-minus-circle  fa-lg float-right"
                      data-id={item._id}
                      onClick={this.delListItem}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );

    return <div>{this.props.dayEvents.length ? dayData : noDayData}</div>;
  }
}

export default DayList;
