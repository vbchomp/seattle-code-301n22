'use strict';

const express = require('express');
const app = express();

require('dotenv');

const cors = require('cors');
app.use(cors());

const jwt = require('jsonwebtoken');

// all of this came from jsonwebtoken docs and will be EXACTLY THE SAME
// ---------------------------
var jwksClient = require('jwks-rsa');
const { response } = require('express');
var client = jwksClient({
  // EXCEPTION!  jwksUri comes from your single page application -> settings -> advanced settings -> endpoint -> the jwks one
  jwksUri: 'https://dev-t18s8k45.us.auth0.com/.well-known/jwks.json'
});

function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
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
  jwt.verify(token, getKey, {}, function (err, user){
    if(err){
      response.status(500).send('invlaid token');
    }
    res.send(user);
  });
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));
