'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const BookModel = require('./models/books.js');
app.use(cors());

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

//Moved books

app.get('/clear', clear);
app.get('/seed', seed);

// JPs original code - works well, and could still be used with jwt verification if done correctly with async/await
// app.get('/books', async (req, res) => {
//   try {
//     //C READ U D
//     let booksdb = await BookModel.find({});
//     res.status(200).send(booksdb);
//   }
//   catch (err) {
//     res.status(500).send('dbase error');
//   }

// });

// Ryan was having issues with async and await, so notice the .find() method uses a callback and no longer uses async and await
app.get('/books', (req, res) => {
  try {

    const token = req.headers.authorization.split(' ')[1];

    // the second part is from jet docs
    jwt.verify(token, getKey, {}, function (err, user) {
      if (err) { // this error if we have a jwt verification error
        res.status(500).send('invlaid token');
      } else {
        BookModel.find((err, dataBaseResults) => {
          if (err) { // this error is if we can't access our DB
            res.send('can\'t access DB');
          } else{
            res.status(200).send(dataBaseResults);
          }
        });

      }
    });
  }
  catch (err) {
    res.status(500).send('dbase error');
  }

});

// start the db
// terminal ipAddress = 127.0.0.1 port 27017
//connect to the db// JP originally had books, I changed to books-demo but also think can-of-books might be a good name.  only problem with using books is that we then have a database named "books" witha  collection named "books" - could cause  confusion.
mongoose.connect('mongodb://127.0.0.1:27017/book-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Connected to the database');

    // how JP seeded the database
    // let books = await BookModel.find({});
    // if (books.length === 0) {
    //   await addBook({
    //     title: 'New Book',
    //     author: 'Awesome Author',
    //   });

    // }

    //listen to port

    app.listen(3001, () => {
      console.log('Server up on 3001');
    });
  });
async function addBook(obj) {
  //CREATE R U D
  //{title: "", author: ""}
  let newBook = new BookModel(obj);
  return await newBook.save();
}

// how JP cleared the database.  totally works! endpoint gives more control, but then seeding things can become a pain unless you have a seed endpoint also.  each way works and we have trade offs
// async function clear() {
//   try {
//     await BookModel.deleteMany({});
//     console.log('Bombed the DBase');

//   }
//   catch (err) {
//     console.log('Error in clearing database');

//   }
// }

// Ryan convereted to a '/clear' endpoint then hits http://localhost:3001/clear to clear db
async function clear(req, res) {
  try {
    await BookModel.deleteMany({});
    res.status(200).send('Bombed the DBase');

  }
  catch (err) {
    res.status(500).send('Error in clearing database');

  }
}

// How Ryan seeded the DB
async function seed(req, res) {
  let books = await BookModel.find({});
  if (books.length === 0) {
    await addBook({ title: 'The Growth Mindset', email: 'brook@codefellows.com', description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.', status: 'FAVORITE FIVE' });
  }
  res.send('Seeded The Database');

}

// comment in and out for JPs solution - totally works if the clear function on 108 is also commented in
//*** USE ONLY AS A LAST RESORT!! Or you want to clearou out development data. :) ***//
//clear();
