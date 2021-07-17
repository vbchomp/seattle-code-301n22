import React from 'react';
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js';
import data from './data.json';

import Modal from 'react-bootstrap/Modal';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      data: data,  //  coming in lab-04
      selectedBeast: {} // might be helpful for lab-03
    }
  }

  handleShowModal = () => {
    this.setState({
      showModal: true,
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
});
  }

  // consider how we would move the modal component to a seperate React Component and then import that Component.  perhaps SelectedBeast in lab?
  render() {
    return (
      <>
        <Header />
       
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>This is my Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>This app helps you keep inventory of household items</Modal.Body>
        </Modal>
        <Main data={data} handleShowModal={this.handleShowModal}/>
        <Footer />
      </>
    )
  }
}

export default App;
