import React from 'react';
import { Container, Button, ListGroup, Modal } from 'react-bootstrap';
import UpdateCatForm from './UpdateCatForm';

class Cats extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //maybe set true at first to proof it works but not necessary, then change to false
      showModal: false,
      selectedCat: null,

    }
  }

  // this solution provides some weirdness cannot just pass the cat to the cat property... gives the wrong cat.  possibly user error... lol
  handleShow = (cat) => {
    this.setState({
      showModal: true,
      selectedCat: cat
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false,
    })
  }

  render() {
    // console.log(this.state.selectedCat)
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
                <Button variant="outline-warning" onClick={() => this.handleShow(cat)}>
                  Update
                </Button>
                <Modal show={this.state.showModal}  onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Body>
                      <UpdateCatForm 
                        handleUpdate={this.props.handleUpdate}
                        // cannot just pass in cat from the above map here.  it gives the wrong cat / next cat in the array - weird
                        cat={this.state.selectedCat}
                        handleClose={this.handleClose}
                      />
                    </Modal.Body>
                  </Modal.Header>
                </Modal>

              </ListGroup.Item>
            ))
            : ''}
        </ListGroup>

      </Container>
    );
  }
}
export default Cats;
