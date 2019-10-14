import React, { Component, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Why.css"



export default class Why extends Component {

  popover = event => {
    ('[data-toggle="popover"]').popover({
       placement: 'top',
       trigger: 'hover'
    });
 };



  render() {
    return <div className="whyStatement">
              <h2 className="whyHeader">Why?</h2>

                <p className="firstPara"><img src="../images/recpic4.jpg" className="leftPic"></img>
              The purpose of this project is to raise awareness on how our daily actions or behavior can impact our community and <span class="hoverOne" data-toggle="popover modal" title="Modal Short Text" data-content="You gotta go through it to see there ain't nothing to it. Listen to the silence." data-target="basicExampleModal">environment</span>. Climate change is the ultimate effect of large carbon footprints. What are carbon footprints? According to carbontrust.com, carbon footprint is defined as the total emissions caused by an individual, event, organization, or product, expressed as carbon dioxide equivalent. The total amount of greenhouse gases produced to directly and indirectly support human activities, usually expressed in equivalent tons of carbon dioxide (CO2).</p>

              <br></br>

              <p className="secondPara"><img src="../images/recpic.jpg" className="rightPic"></img> In other words: When you drive a car, the engine burns fuel which creates a certain amount of CO2, depending on its fuel consumption and the driving distance. (CO2 is the chemical symbol for carbon dioxide). When you heat your house with oil, gas or coal, then you also generate CO2. Even if you heat your house with electricity, the generation of the electrical power may also have emitted a certain amount of CO2. When you buy food and goods, the production of the food and goods also emitted some quantities of CO2.</p>

    </div>;
  }
}
