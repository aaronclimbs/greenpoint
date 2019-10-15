import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import "./Why.css"



export default class Why extends Component {

  state = {
    turtlemodal: false,
    videomodal: false,
    firemodal: false,
    icemodal: false
  };


 turtletoggle = () => {
  this.setState({
    turtlemodal: !this.state.turtlemodal
  });
};

 videotoggle = () => {
  this.setState({
    videomodal: !this.state.videomodal
  });
};

firetoggle = () => {
  this.setState({
    firemodal: !this.state.firemodal
  });
};

icetoggle = () => {
  this.setState({
    icemodal: !this.state.icemodal
  });
};



  render() {
    return <div className="whyStatement">
              <h2 className="whyHeader">Why?</h2>

              <p className="hoverText">Hover over the red text to see more.</p>

              <Modal className="why-modal-wholeVideo modal-dialog modal-lg" isOpen={this.state.videomodal} toggle={this.videotoggle}>
              <div class="youtube-responsive-container">
              <ModalHeader className="why-modal-video"><iframe width="560" height="315" src="https://www.youtube.com/embed/ooRekjsFY_I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></ModalHeader>
         </div>
          <ModalBody>
<p className="why-modal-text" >Climate change protesters across globe march in largest climate protest in history.</p>
          </ModalBody>
        </Modal> 
                <p className="firstPara"><img src="../images/recpic4.jpg" className="leftPic"></img>
              The purpose of this project is to raise <span
               className="hoverOne" onMouseOver={this.videotoggle}>awareness</span> on how our daily actions or behavior can impact our community and <span
               className="hoverOne" onMouseOver={this.turtletoggle}>environment</span>. Climate change is the ultimate effect of large carbon footprints. What are carbon footprints? According to carbontrust.com, carbon footprint is defined as the total emissions caused by an individual, event, organization, or product, expressed as carbon dioxide equivalent. The total amount of greenhouse gases produced to directly and indirectly support <span
               className="hoverOne" onMouseOver={this.icetoggle}>human activities</span>, usually expressed in equivalent tons of carbon dioxide (CO2).</p>


<Modal className="why-modal-turtle" isOpen={this.state.turtlemodal} toggle={this.turtletoggle}>
          <ModalHeader className="why-modal-header"><img className="whyHoverOne"></img></ModalHeader>
          <ModalBody>
<p className="why-modal-text">A baby sea turtle that died after washing ashore in Boca Raton, Florida, had 104 pieces of small plastic in it.</p>
          </ModalBody>
        </Modal>

        <Modal className="modal-lg" isOpen={this.state.icemodal} toggle={this.icetoggle}>
          <ModalHeader className="why-modal-ice"><img className="whyHoverOne"></img></ModalHeader>
          <ModalBody>
<p className="why-modal-text">Trift Glacier, Switzerland, has retrated by 1.17 km (0.7 miles) between 2006 (left) and 2015 (right).</p>
          </ModalBody>
        </Modal>

        <Modal className="modal-lg" isOpen={this.state.firemodal} toggle={this.firetoggle}>
          <ModalHeader className="why-modal-fire"><img className="whyHoverOne"></img></ModalHeader>
          <ModalBody>
<p className="why-modal-text">Breaking! Fast-Spreading Wildfires, Evacuations and Power Shut Down in California on October 11, 2019.</p>
          </ModalBody>
        </Modal>

              <br></br>

              <p className="secondPara"><img src="../images/recpic.jpg" className="rightPic"></img> In other words: When you drive a car, the engine <span className="hoverOne" onMouseOver={this.firetoggle}>burns</span> fuel which creates a certain amount of CO2, depending on its fuel consumption and the driving distance. (CO2 is the chemical symbol for carbon dioxide). When you heat your house with oil, gas or coal, then you also generate CO2. Even if you heat your house with electricity, the generation of the electrical power may also have emitted a certain amount of CO2. When you buy food and goods, the production of the food and goods also emitted some quantities of CO2.</p>

    </div>;
  }
}
