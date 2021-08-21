import React from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';

class Cats extends React.Component {
  render() {
    return (
      <Container>
        <ListGroup>
          {this.props.cats.length ?
            this.props.cats.map(cat => (
              <ListGroup.Item key={cat._id}>
                <h3>{cat.name}</h3>
                <Button variant="outline-danger" onClick={() => this.props.handleDelete(cat._id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))
            : ''}
        </ListGroup>

      </Container>
    );
  }
}
export default Cats;
