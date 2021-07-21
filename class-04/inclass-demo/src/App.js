import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'user',
      year: 0,
    }
  }

  // Option B for username - which is better? define better: Shows cool REACTIVE functionality - but not as efficient
  handleSubmit = e => {
    e.preventDefault();
    console.log('submitted');
    let username = e.target.name.value;
    console.log('username:', username);
    let dob = e.target.dob.value;
    console.log('dob:', dob);
    this.setState({
      username: e.target.name.value,
    })
  }

  // Option A for username - which is better? define better:  more efficient
  renderNameAsIType = e => {
    this.setState({
      username: e.target.value,
    })
  }

  handleChange = e => {
    this.setState({
      year: e.target.value,
    })
  }



  render() {
    return (
      <>
        <h1>In-Form-Ed</h1>
        <h2 id="nameHeader">Welcome, {this.state.username} your fave year is {this.state.year ? this.state.year : '?'}!</h2>
        <Container>

          <Form id="myForm" onSubmit={this.handleSubmit}>
            
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onInput={this.renderNameAsIType} />
            </Form.Group>
            
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Fave year</Form.Label>
              <Form.Select onChange={this.handleChange}>
              <option value="">Select a Year</option>
              <option value="1999">1999 the Year!</option>
              <option value="2000">2000 no Y2K here</option>
              <option value="1974">1974 Ryan was born</option>
              <option value="2021">2021 better than 2020</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

          </Form>
        </Container>
      </>
    );
  }
}

export default App;
