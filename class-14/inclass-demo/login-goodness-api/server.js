'use strict';

const express = require('express');
const app = express();

require('dotenv');

const cors = require('cors');
app.use(cors());
// in order to access the request body, we must use express.json();
app.use(express.json());

// mongoose / mongo here
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cats-database', { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose error handling and connection verification
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true }
});

const CatModel = mongoose.model('cats', catSchema);

const jwt = require('jsonwebtoken');

// all of this came from jsonwebtoken docs and will be EXACTLY THE SAME
// ---------------------------
var jwksClient = require('jwks-rsa');
var client = jwksClient({
  // EXCEPTION!  jwksUri comes from your single page application -> settings -> advanced settings -> endpoint -> the jwks one
  jwksUri: 'https://dev-t18s8k45.us.auth0.com/.well-known/jwks.json'
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
//---------------------------------

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/test-login', (req, res) => {
  // grab the token sent by the front end
  const token = req.headers.authorization.split(' ')[1];

  // the second part is from jet docs
  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      res.status(500).send('invlaid token');
    }
    res.send(user);
  });
});



let seed = (req, res) => {
  try {
    const fluffy = new CatModel({ name: 'Fluffy', color: 'white' });
    const felix = new CatModel({ name: 'Felix', color: 'gray' });
    const sativa = new CatModel({ name: 'Sativa', color: 'cream' });
    fluffy.save();
    felix.save();
    sativa.save();
    // another way
    // CatModel.create({ name: 'Fluffy', color: 'White' })
    res.send('Cats Seeded');
  } catch (err) {
    res.send('coudn\'t seed cats');
  }
};

let clear = async (req, res) => {
  await CatModel.deleteMany({});
  res.send('CatsCleared');
};

app.get('/seed', seed);
app.get('/clear', clear);
app.get('/cats', async (req, res) => {
  await CatModel.find((err, cats) => {
    if (err) return console.error(err);
    console.log({ cats });
    res.send(cats);
  });
});

// handle post request - error handling and wrapping in auth is good
app.post('/cats', (req, res) => {
  // get information from the body

  // test that post works
  // res.send('hit the post!');

  // one way to get info from req.body
  // let name = req.body.name;

  // we can also use object destructuring to grab name and color propertiesd
  let { name, color } = req.body;
  // let objLiteral = {
  //   name: name,
  //   color: color
  // }
  // THIS IS THE SAME

  // lets post the new cat to the database
  let newCat = new CatModel({ name, color });
  newCat.save();

  res.send(newCat);
});

//handle delete request - wrapping in auth is VERY GOOD
// :id assigns the information after cats/ to the params variable id
app.delete('/cats/:id', async (req, res) => {
  let myId = req.params.id;
  await CatModel.findByIdAndDelete(myId,);
  res.send(`successfully deleted`);
});

// PUT - update a database entry here.
app.put('/cats/:id', async (req, res) => {
  try {
    let myId = req.params.id;
    console.log('req.body:', req.body);
    let { name, color } = req.body;
    const updatedCat = await CatModel.findByIdAndUpdate(myId, { name, color }, { new: true, overwrite: true });

    res.status(200).send(updatedCat);
  }
  catch (error) {
    res.status(500).send('Unable to update database:', error);
  }
})
app.listen(PORT, () => console.log(`listening on ${PORT}`));
