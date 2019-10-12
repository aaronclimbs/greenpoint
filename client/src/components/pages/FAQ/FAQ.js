import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import qsAndAs from './question-answers';
import Question from './Question';
import "./faq.css"

export default class FrequentlyAsked extends Component {

  state = {
    questions: qsAndAs
  };

  // loadFAQs = () => {
  //   this.setState({ questions: qsAndAs });
  // };
  
  render() {
    return (
      <div>
        <Container className="faq-container">
          <Row>
            <Col>
              <h1>Frequently Asked Questions</h1>
              <br></br>
              <br></br>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* Render FAQs here */}
              <ul className="question-list">
                {Object.keys(this.state.questions).map(key =>
                  <Question 
                    key={key}
                    questions={this.state.questions[key]}
                  />
                )}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
