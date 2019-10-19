import React, { Component } from "react";
import {
 Row, Col,Container
} from "reactstrap";
import "./style.css"

export default class Landing extends Component {
  render() {
    return (

      <Container className="mt-4">

      <Row>
        <Col md={3}> 
        
        </Col>
        <Col md={6} className="text-center"><img className="landing-img" src="/images/gpback.jpg" />
        <div className="landing-tagline">See how your daily actions can <span className="landing-add">ADD</span> up to a better world</div> 
        
      <Row className="justify-content-center mt-2">
      <div className="float-left text-center floatdown ml-1" > <img src="../images/recycle.jpg"/><div>Re Use</div> </div>
      <div className="float-left text-center floatdown ml-4"> <img src="../images/greenaction.jpg"/><div>Green Action</div></div>
      <div className="float-left text-center floatdown ml-4"> <img src="../images/lifestyle.jpg"/><div>Lifestyle</div></div>
      <div className="float-left text-center floatdown ml-4"> <img src="../images/transportation.jpg"/><div>Transportation</div></div>
      <div className="float-left text-center floatdown ml-4"> <img src="../images/food.jpg"/><div>Food</div></div>
        </Row>
        </Col>
        <Col md={3}> 
       
        </Col>
      </Row>
      <Row>
          <Col md={2}>
       
          </Col>
          <Col md={2}>
       
          </Col>
          <Col md={2}>

          </Col>
          <Col md={2}>

          </Col>
          <Col md={2}>
       
          </Col>
          <Col md={2}>

          </Col>
        
      </Row>
   
   




      </Container>

      // <div>
      //   <h5 className="text-center mt-2 mb-2">Learn how your daily actions impact your carbon footprint</h5>
      // </div>
    );
  }
}
