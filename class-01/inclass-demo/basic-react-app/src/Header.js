import React from 'react';

class Header extends React.Component {
  render() {
    return (
      // the <> syntax is a partial and "acts" like a parent element
      <header>
        <h1>Hello World</h1>
        <nav>
          <ul>
            <li>Nav One</li>
            <li>Nav Two</li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;
