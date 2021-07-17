import React from 'react';
import Button from 'react-bootstrap/Button';

import './Item.css';

class Item extends React.Component {
  // Props: let us pass data from parent component to Child component.  one direction. child cannot change the props.

  // State: lets a component save AND update data FOR ITSELF.  wthin 1 component. Can be updated using setState.

  // creating and defining state.  this is just how's done.
  constructor(props){
    super(props);
    this.state = {
      numberOnHand: 0,
      showFavorite: false,
    }
  }

  addOne = () => {
    this.setState({
      numberOnHand: this.state.numberOnHand + 1,
    });
    this.props.handleWalletProperty(this.props.cost);
  }

  useOne = () => {
    this.setState({
      numberOnHand:  this.state.numberOnHand - 1,
    });
  }

  favorite = () => {
    this.setState({
      showFavorite: true,
    });
  }

  render() {
    // console.log('item props', this.props);

    return (
      <article className="item">
        <h3>{this.props.title}</h3>
        <img 
          src={this.props.imageUrl} 
          alt={this.props.description} 
          title={this.props.title} 
        />
        <p>{this.state.numberOnHand ? this.state.numberOnHand : 'not'} available</p>

        {/* WTF */}
        <p>{this.state.showFavorite ? '❤️' : ''}</p>
        
        <p onClick={this.favorite}>{this.props.description}</p>

        <Button variant="outline-success" onClick={this.addOne}>Add One</Button>
        <Button variant="outline-danger" onClick={this.useOne}>Use One</Button>
      </article>
    );
  }
}

export default Item;
