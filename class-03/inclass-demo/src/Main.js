import React from 'react';
import Item from './Item.js';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      wallet: 200,
    }
  }

  manageWallet = (cost) =>  {
    this.setState({
      wallet: this.state.wallet - cost,
    });
  }

  // we've passed the Main.js method manageWallet to Item. Now Item has a pass-thru-window to Main.js's state property wallet. and we enable Main state to change WITHIN the Main.js component BECAUSE of what is happening in the relevant ITEM child component 
  render() {
    let itemComponents = this.props.data.map((itemComponent, index) => (<Item
        handleWalletProperty={this.manageWallet}
        key={index}
        cost={itemComponent.cost}
        title={itemComponent.title}
        imageUrl={itemComponent.image}
        description={itemComponent.description}
      />)
    );
      // console.log(this.state);
      // console.log('main props', this.props);
    return (
      <main>
         <h2 onClick={this.props.handleShowModal}>About This App</h2>
        <h3>Wallet Balance: ${this.state.wallet}</h3>
        {itemComponents}
      </main>
    );
  }
}

export default Main;
