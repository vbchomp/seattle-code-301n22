import React from 'react';
import Item from './Item.js';
import data from './data.json';

class Main extends React.Component {

  
  render() {
    let itemComponents = [];

    data.forEach((itemComponent, index) => {
      let item = <Item
        key={index}
        title={itemComponent.title}
        imageUrl={itemComponent.image}
        description={itemComponent.description}
      />
      itemComponents.push(item);
    });

    return (
      <main>
        {itemComponents}
      </main>
    );
  }
}

export default Main;
