import React from 'react';
import './App.css';
import LoginButton from './Loginbutton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class App extends React.Component {
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
        </>
      )
    }
  }
}

export default withAuth0(App);
