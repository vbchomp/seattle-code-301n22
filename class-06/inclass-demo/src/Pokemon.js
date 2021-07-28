import React from 'react';
import axios from 'axios';

class Pokemon extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayPokemon: false,
      pokemons: [],
    }
  }

  // asynchronous code: choosing to use axios and async / await
  getPokemon = async () => {

    console.log('button done got clicked');

    // await syntax is just how it works.  it says "Hey javaScript.  this will take as long as it takes"
    // this line is the magic.  it properly gets our pokemon results
    let pokemonResults = await axios.get('https://pokeapi.co/api/v2/pokemon');

    // widdle in and prove you can get the data you want with console logs.  PROOF. OF. LIFE
    // console.log(pokemonResults.data.results);
    this.setState({
      pokemons: pokemonResults.data.results,
      displayPokemon: true,
    })

  }


  // iternary (wtf: what ? true : false)  condition ? <return if true> : <return if false>
  render() {
    // remember you can check state
    // console.log(this.state);
    let pokemonToRender = this.state.pokemons.map((pokemon, index) => <li key={index}>{pokemon.name}</li>)

    return (
      <>
        <h2>Pokemon Names</h2>
        <button onClick={this.getPokemon}>Want to see them?</button>
        <ul>
          {this.state.displayPokemon ? pokemonToRender : ''}
        </ul>
      </>
    );
  }
}

export default Pokemon;
