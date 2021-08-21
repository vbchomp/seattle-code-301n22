import React from 'react';
import './App.css';
import Cats from './Cats';
import CatForm from './CatForm';

import LoginButton from './Loginbutton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cats: [],
    }
  }

  async componentDidMount(){
    try {
      const results = await axios.get('http://localhost:3001/cats');
      this.setState({cats: results.data});
    } catch(err){
      console.log(err);
    }
  }

  handleCreate = async (catInfo) => {
    console.log()
    try {
      let response = await axios.post('http://localhost:3001/cats', catInfo);
      let newCat = response.data;
      this.setState({
        cats: [...this.state.cats, newCat],
      })
    } catch(err){
      console.log(err)
    }
  }

  handleDelete = async (id) => {
    // console.log(id);
    try {
      await axios.delete(`http://localhost:3001/cats/${id}`);
      let remainingCats = this.state.cats.filter(cat => cat._id !== id);
      this.setState({
        cats: remainingCats
      });
    } catch (err){
      console.log(err);
    }
    
  }

  makeRequest = async() => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log('jwt: ', jwt);
    const config = {
      headers: {"Authorization" : `Bearer ${jwt}`},
    };

    const serverResponse = await axios.get('http://localhost:3001/test-login', config);

    console.log('it worked if data:  ', serverResponse);
  }

  render() {
    console.log(this.state);
    console.log('props', this.props.auth0);
    const { user, isLoading, isAuthenticated } = this.props.auth0;
    // the following is the same
    // const userLongWay = this.props.auth0.user

    if (isLoading) {
      return <h2>Loading...</h2>
    } else {
      return (
        <>
          <h1>Login Goodness</h1>

          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          {user ? <>
            <h2>{user.name}</h2>
            <button onClick={this.makeRequest} >Make Request to Server</button>
          </> : ''}
          <CatForm handleCreate={this.handleCreate}/>
          <Cats cats={this.state.cats} handleDelete={this.handleDelete}/>
        </>
      )
    }
  }
}

export default withAuth0(App);
