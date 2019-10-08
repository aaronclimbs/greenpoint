import React, { Component } from "react";
import scraper from "../../../helpers/scraper"
import "./Resources.css"

export default class Resources extends Component {

  componentDidMount() {
scraper();
  }




render() {
    // Page Render
    return (
      <div>
        <h5 className="text-center mt-2 mb-2">Resources</h5>
      </div>
    );
  }
}
