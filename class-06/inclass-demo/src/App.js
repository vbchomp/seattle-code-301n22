import React from 'react';
import Pokemon from './Pokemon';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      renderLatLon: false,
      lat: 0,
      lon: 0,
      renderError: false,
      errorMessage: '',
    }
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value })
  }

  // choosing to use axios with async and await
  getCityInfo = async (e) => {
    e.preventDefault();

    // how we use .env
    // - variable NEEDS TO BE this:  REACT_APP_LOCATIONIQ_KEY=<your key no spaces!>
    // process.env.VARIABLE_NAME
    try {
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);

      console.log(cityResults.data[0].lat);
      this.setState({
        renderLatLon: true,
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        renderError: false,

      });
    } catch (error) {
      console.log('I am here')
      console.log('my error: ', error.response);
      this.setState({
        renderError: true,
        errorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`,
  
      })
    }
  }



  render() {
    console.log(this.state)
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.getCityInfo}>
          <input onChange={this.handleChange} />
          <button>Get City Info</button>
        </form>

        {this.state.renderLatLon ? <h4>lat: {this.state.lat}, long: {this.state.lon}</h4> : ''}
        {this.state.renderError ? <h3>{this.state.errorMessage}</h3> : ''}
        <Pokemon />
      </>
    )
  }
}
export default App;
