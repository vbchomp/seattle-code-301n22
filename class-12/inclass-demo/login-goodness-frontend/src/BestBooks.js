import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class BestBooks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
    }
  }

  componentDidMount = async  () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log('jwt: ', jwt);
    const config = {
      headers: {"Authorization" : `Bearer ${jwt}`},
    };

    const results = await axios.get('http://localhost:3001/books', config);
    console.log(results.data);
    this.setState({
      books: results.data
    })
  }
  render() {
    console.log(this.state)
    return (
      <>
        <h4>BestBooks Component Lives</h4>
      </>
    );
  }
}
export default withAuth0(BestBooks);
