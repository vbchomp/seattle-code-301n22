import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

class CatFormUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.cat._id,
      name: this.props.cat.name,
      color: this.props.cat.color,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //this.props.handleCreate({ name, color });
    this.props.handleUpdate(this.state);
    this.props.handleClose();
  }
  handleName = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }
  handleColor = (e) => {
    e.preventDefault();
    this.setState({ color: e.target.value });
  }
  render() {
    console.log('catFormUpdateState:', this.state)
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} >
          <Form.Label>
            <h2>Update A Cat</h2>
          </Form.Label>

          <Form.Group controlId="name">
            <Form.Label>Cat Name</Form.Label>
            <Form.Control type="text" onChange={this.handleName} value={this.state.name} />
          </Form.Group>

          <Form.Group controlId="color">
            <Form.Label>Cat Color</Form.Label>
            <Form.Control type="text" onChange={this.handleColor} value={this.state.color} />
          </Form.Group>
          <Button type="submit" >
            Update Cat
          </Button>
        </Form>
      </Container>
    );
  }
}
export default CatFormUpdate;
