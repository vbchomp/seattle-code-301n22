'use strict';

// intro to arrow functions

function sum(a, b) {
  let add = a + b;
  return add;
}

let sumTwo = function (a, b) {
  let add = a + b;
  return add;
};

console.log('funciton with keyword', sum(3, 4));
console.log('funciton with keyword and assignment operator', sumTwo(3, 4));


let sumArrowFunction = (a, b) => {
  let add = a + b;
  return add;
};

console.log('multi-line arrow function', sumArrowFunction(3, 4));

let sumOneLiner = (a, b) => a + b;

console.log('one-line arrow function', sumOneLiner(3, 4));

// this is weird.  don't stress
let sumReactFunction = (a, b) => (
  a + b
);

console.log('you\'ll see this in React arrow function', sumReactFunction(3, 4));

() => { };

// THIS - context is different - BY DESIGN

// consturctors!
const Pet = function (name, species) {
  this.name = name;
  this.species = species;
  this.example = function () {
    console.log(`Hello, I'm ${this.name}!`);
  };
};

Pet.prototype.sayhello = function () {
  console.log(`Hello, I'm ${this.name}!`);
};

let lux = new Pet('Lucky', 'dog');

console.log(lux);
lux.sayhello();

// parent or SUPER class
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }

  sayhello() {
    console.log(`Hello, I'm ${this.name}!`);
  }

}

// child or sub class (of animal)
let lucky = new Animal('Lucky', 'dog');
console.log(lucky);
lucky.sayhello();


class Dog extends Animal {
  constructor(name, species, breed) {
    super(name, species);
    this.breed = breed;
  }

  bark() {
    console.log('woof');
  }
}

let myLucky = new Dog('Lucky', 'dog', 'lab/staffy');
console.log(myLucky);
myLucky.bark();

// does not work.  not an instance of dog
// lucky.bark();
