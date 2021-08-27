import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

class UpdateCatForm extends React.Component {
  // This couldAn important distinction can be made.  IF I wanted to use the same form, maybe as a stretch goal, how would I do that? Also would need all the onchange functionality in other form....   I would leave that there...  

  //I regret thinking I was smart and doing it all in the handleSubmit now.  lol.

  // turns out that if you want to CHANGE the value, you must use a onChange on each box....  ffrustrating!  lol
  
  
  // Stretch Goal note for your eyes only:  one possible way. if update Functionality desired, pass along a cat property.  if that property exists, use destructuring to create a name and color variable, if those variables exit, pass them as values to the form to be updated and call the handleUpdate when the button is pushed.  IF its a new book and no cat prop exists, no values included and call the handleCreate when the button is pushed 

  constructor(props) {
    super(props);
    this.state = {
      // id necessary.  not so we can change, but so that we can use it to reference the cat to be cahnged in axios call
      _id: this.props.cat._id,
      name: this.props.cat.name,
      color: this.props.cat.color,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.handleUpdate(this.state);
    this.props.handleClose();
  }

  // must use to change value - using handleSubmit doesnt work nicely with the form - cannot change the value in the form field
  handleNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  // must use to change value - using handleSubmit doesnt work nicely with the form - cannot change the value in the form field
  handleColorChange = (event) => {
    this.setState({color: event.target.value})
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} >
          <Form.Label>
            <h2>Update A Cat Form</h2>
          </Form.Label>

          <Form.Group controlId="name">
            <Form.Label>Cat Name</Form.Label>
            <Form.Control type="text" onChange={this.handleNameChange} value={this.state.name}/>
          </Form.Group>

          <Form.Group controlId="color">
            <Form.Label>Cat Color</Form.Label>
            <Form.Control type="text"  onChange={this.handleColorChange} value={this.state.color}/>
          </Form.Group>
          <Button type="submit">
            Add Cat
          </Button>
        </Form>
      </Container>
    );
  }
}
export default UpdateCatForm;
