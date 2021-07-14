import React from 'react';
import Item from './Item.js';
import data from './data.json';

class Main extends React.Component {
  render() {
    let itemsToRenderArr = [
      <Item
        title={data.title}
        imageUrl={data.image}
        description={data.description}
      />, 
      <Item
        title="Dog Treats"
        imageUrl="https://images.unsplash.com/photo-1582798358481-d199fb7347bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
        description="Dog treats by Maria Elena Hewett"
      />
    ]
    return (
      <main>
        {itemsToRenderArr}
      </main>
    );
  }
}

export default Main;
