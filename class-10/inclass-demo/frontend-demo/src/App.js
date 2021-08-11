
import React from 'react';
import axios from 'axios';

import { Button, Container, Carousel } from 'react-bootstrap';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pets: [],
      pictures: [],
      errorMessage: '',
    }
  }

   

getData = async (e) => {
  e.preventDefault();
  try {let species = e.target.species.value
  let petInfo = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pets?species=${species}`);

  console.log(petInfo);

  this.setState({
    pets: petInfo.data,
  })} catch (error) {
    this.setState({
      errorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`
    })
  }
}

getPictures = async (e) => {
  e.preventDefault();
  console.log(e.target.imageType.value);
  let searchQuery = e.target.imageType.value;

  //original - not in a try / catch - which would have been preferred
  let pictureResults = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pictures?searchQuery=${searchQuery}`);

  console.log(pictureResults.data)
  this.setState({
    pictures: pictureResults.data,
  })
  
}

  render() {
    console.log(this.state);

    let carouselItems = this.state.pictures.map((pic, index) => (
      <Carousel.Item key={index} >
        <img 
          className="d-block w-100"
          src={pic.src}
          alt={pic.alt}
        />
        <Carousel.Caption>
          <h3>{pic.photographer}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ))

    return(
      <>
        <h1>Pets and Images</h1>
        <form onSubmit={this.getData}>
          <input id="species" />
        <button >Get data</button>

        </form>
        <form className="pushDown" onSubmit={this.getPictures}>
          <input id="imageType" />
        <Button type="submit">Get Pictures</Button>
        </form>
        {
          this.state.pictures.length > 0 ?
          <Container>
            <Carousel>
              {carouselItems}
            </Carousel>
          </Container>
          : ''
        }


        {this.state.pets.length !== 0 
        ? this.state.pets.map((pet, index) => <h3 key={index}>{pet.name}</h3>) 
        : ''}
        {this.state.errorMessage ? <h3>{this.state.errorMessage}</h3> : ''}
      </>
    )
  }
}

export default App;
