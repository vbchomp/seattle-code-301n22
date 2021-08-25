import React from 'react';
import { Container, Button, ListGroup, Modal } from 'react-bootstrap';
import CatFormUpdate from './CatFormUpdate.js'

class Cats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      selectedCat: null
    }
  }
  handleClose = () => {
    this.setState({
      showModal: false
    });
  }
  handleShow = (cat) => {
    this.setState({
      showModal: true,
      selectedCat: cat
    });
  }
  render() {
    console.log('CatsState:', this.state);
    return (
      <Container>
        <ListGroup>
          {this.props.cats.length ?
            this.props.cats.map(cat => (
              <ListGroup.Item key={cat._id}>
                <h3>{cat.name}</h3>
                <h4>{cat.color}</h4>
                {/* Pass in the selected Cat */}
                <Button variant="secondary" onClick={() => this.handleShow(cat)}>Update</Button>
                <Button variant="outline-danger" onClick={() => this.props.handleDelete(cat._id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))
            : ''}
          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              {/* This is a modifed CatForm Component */}
              <CatFormUpdate handleUpdate={this.props.handleUpdate} cat={this.state.selectedCat} handleClose={this.handleClose} />
            </Modal.Body>
          </Modal>
        </ListGroup>

      </Container>
    );
  }
}
export default Cats;
