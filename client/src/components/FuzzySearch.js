import React, { Component } from "react";
import { Input, Form, FormGroup, Button, Label } from "reactstrap";

class FuzzySearch extends Component {
  state = {
    matches: []
  };
  render() {
    const { events, onSubmit, onChange } = this.props;
    const findMatches = e => {
      if (e.target.value) {
        const matches = events.filter(event => event.name.includes(e.target.value));
        this.setState({
          matches: matches
        });
      } else {
        this.setState({
          matches: []
        });
      }
    };

    return (
      <div>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Input placeholder="Add an event..." className="w-50" onChange={findMatches} />
          </FormGroup>
        </Form>
        <div id="targetDiv">
          {this.state.matches.map(match => {
            return <p key={match.id}>{match.name}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default FuzzySearch;
