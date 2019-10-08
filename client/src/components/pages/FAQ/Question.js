import React from 'react';
import Collapsible from 'react-collapsible';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render(){

        const { question, answer } = this.props.questions;

        return (
            <Collapsible trigger={question}>
                <p>{answer}</p>
            </Collapsible>
        );
    }

}

export default Question;