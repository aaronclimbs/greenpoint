import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, ListGroup, ListGroupItem, Row,Col} from "reactstrap";
import { connect } from "react-redux";
import { loadList } from "../../actions/eventActions"

class EventList extends Component {

    state = {
        dropdownOpen: false,
        dropdownValue:"Choose a Green Action",
        selected: []
      };

      // onChange = e => {
      //   this.setState({
      //     [e.target.name]: e.target.value
      //   });
      // };

      onClick = e => {
        console.log(e.target);
        console.log(e.currentTarget);
        e.preventDefault();
          console.log("Item list click" + e.currentTarget.catname)
          // console.log("Target is " + JSON.stringify(e.target))
          // console.log("Target is " + JSON.stringify(e.currentTarget))
          const newSelect = {
            id: e.currentTarget.id,
            name: e.currentTarget.name,
            cat: e.currentTarget.getAttribute('data-category'),
        
           
          }
        this.setState({
            selected: [...this.state.selected, newSelect]
        }, () => {
            this.setState({
                dropdownValue: this.state.selected.length > 0 ? "Choose another Green Action" : "Choose a Green Action"
            })
        });
      };

      delListItem = e => {
        e.preventDefault()
        const itemLoc = e.currentTarget.getAttribute("data-id")
        

        const Select = this.state.selected
        console.log("Select is " + Select)
        const newSelect = Select.splice(itemLoc,1)
        console.log("Select is now " + Select )

        
       this.setState({
         selected: Select
       })
     
        

      }

      

    componentDidMount() {

        this.props.loadList()

    }

    toggle = () => {
        this.setState ({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    render() {

        return (

        
        <Form onSubmit={this.onSubmit} className="w-75">
           
        <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
         {this.state.dropdownValue}
        </DropdownToggle>
        <DropdownMenu >
          <DropdownItem header>Choose an Event</DropdownItem>
          <DropdownItem divider />
          {this.props.events.events.map(event => {
            
              return  <DropdownItem onClick={this.onClick} name={event.name} id={event._id} key={event._id} data-category={event.category}><div >{event.name}</div></DropdownItem>;

            })}
       
        </DropdownMenu>
        </Dropdown>

        <ListGroup>
          {this.state.selected.map((item, index) => {
            return  <ListGroupItem key={index}> <Row className="">
            <Col md={1}>{index}</Col>  
            <Col md={3}>{item.name} </Col>
            <Col md={3}>Category: {item.cat}</Col>
            <Col md={1}>
            
            <Label for="quantity">Quantity</Label>
            </Col>
            <Col md={1}>
            <Input
            type="number"
            name="quantity"
            id="quantity"
            
            onChange={this.onChange}
            
        /> </Col>
        <Col md={3}>
          <i className="col icon-remove float-right" data-id={index} onClick={this.delListItem}></i>
          </Col>
          </Row>
          </ListGroupItem> 
        
          })}

       

      
        </ListGroup>
       


        <Button type="submit" className="w-25" color="dark" style={{ marginTop: "2rem" }} block>
                Submit
              </Button>
         
        </Form>




          


        )




    }


}












const mapStateToProps = state => ({
    events: state.events

});

export default connect(
    mapStateToProps,
    { loadList }
)(EventList);