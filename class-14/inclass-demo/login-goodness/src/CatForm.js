import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

class CatForm extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: '',
  //     color: '',
  //   };
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let color = e.target.color.value
    console.log(name, color);
    this.props.handleCreate({name, color});
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} >
          <Form.Label>
            <h2>Add A Cat Form</h2>
          </Form.Label>

          <Form.Group controlId="name">
            <Form.Label>Cat Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group controlId="color">
            <Form.Label>Cat Color</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Button type="submit">
            Add Cat
          </Button>
        </Form>
      </Container>
    );
  }
}
export default CatForm;
