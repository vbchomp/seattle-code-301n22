
import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pets: [],
    }
  }

getData = async (e) => {
  e.preventDefault();
  let species = e.target.species.value
  let petInfo = await axios.get(`http://localhost:3001/pets?species=${species}`);

  console.log(petInfo);

  this.setState({
    pets: petInfo.data,
  })
}

  render() {
    console.log(this.state);
    return(
      <>
        <h1>Frontend Demo</h1>
        <form onSubmit={this.getData}>
          <input id="species" />
        <button >Get data</button>

        </form>
        {this.state.pets.length !== 0 
        ? this.state.pets.map((pet, index) => <h3 key={index}>{pet.name}</h3>) 
        : ''}
      </>
    )
  }
}

export default App;
