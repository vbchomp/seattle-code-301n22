'use strict';

console.log('Hello World, from our FIRST server');

// in our servers, we must use require instead of import
const express = require('express');

// how its as per the docs
const app = express();

// allow frontend to access data from the backend
const cors = require('cors');
app.use(cors());

// uase dotenv to access our .env file -- must be done BEFORE defining PORT
require('dotenv').config();

const axios = require('axios');
const PORT = process.env.PORT;
// -------------------------------------------
// everything above this line is exactly what you need for an express (or close it)
let petData = require('./pets.json');
console.log('port is: ', PORT);

// specify what routes our server should be listening for
app.get('/', (request, response) => {
  // when we get that request, we send back the following results
  response.send('Hello, from the server!');
});

app.get('/banana', (request, response) => {
  //when we get THAT request, we send the following results
  response.send('mmmm, bananas!');
});

app.get('/pets', (request, response) => {
  let species = request.query.species;
  response.send(petData.filter(pet => pet.species.includes(species)));
});

app.get('/pictures', async (req, res) => {
  let searchQuery = req.query.searchQuery;

  let results = await axios.get(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);

  res.send(results.data.results.map(pic => new Picture(pic)));

});

//query parameters allow us to send extra information to the backend
// accessed with:  http://localhost:3001/sayHello?name=Ryan
app.get('/sayHello', (request, response) => {
  // we access query parameters using request.query
  let name = request.query.name;
  response.send(`Hello, ${name}`);
});

// if I am am going to catch all other requests.  that catch all must be the LAST route
app.get('/*', (request, response) => {
  response.status(404).send('Something Went Wrong');
});

class Picture {
  constructor(image) {
    this.src = image.urls.regular;
    this.alt = image.alt_description;
    this.photographer = image.user.name
  }
}

// tell our server to start listening for requests
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
