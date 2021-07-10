// deleted import logo.svg
import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

import './App.css';

class App extends React.Component {
  render() {
    // you may only return ONE parent level element
    return (
      <>
        <Header />
        {/* <img src="where" alt="accessibility description" /> */}
        <Main 
          title="Lucky the Dog" 
          description="lucky is a adopted family member of mine!"
        />
        <Footer />
      </>
    )
  }
}

export default App;
