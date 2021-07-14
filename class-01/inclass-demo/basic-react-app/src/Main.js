import React from 'react';

class Main extends React.Component {
  render(){
    return(
      <main>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
      </main>
    )
  }
}

export default Main;
